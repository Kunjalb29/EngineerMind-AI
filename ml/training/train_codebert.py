#!/usr/bin/env python3
"""
EngineerMind AI — CodeBERT Vulnerability Detection Training
Fine-tunes CodeBERT on the Devign dataset for binary vulnerability detection.
Target: F1 Score > 0.88

Usage:
    python ml/training/train_codebert.py --epochs 5 --batch-size 16

Reference:
    - Model: microsoft/codebert-base
    - Dataset: Devign (~27,000 C functions)
    - Paper: Feng et al. (2020) CodeBERT: A Pre-Trained Model for Programming and Natural Languages
"""

import os
import json
import logging
import argparse
from pathlib import Path
from typing import Dict, List, Tuple

import torch
import numpy as np
from torch import nn
from torch.utils.data import Dataset, DataLoader
from transformers import (
    RobertaTokenizer,
    RobertaForSequenceClassification,
    AdamW,
    get_linear_schedule_with_warmup,
    TrainingArguments,
    Trainer,
)
from sklearn.metrics import f1_score, roc_auc_score, classification_report

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ─── Configuration ─────────────────────────────────────────────────────────────

MODEL_NAME = "microsoft/codebert-base"
OUTPUT_DIR = Path("ml/models/codebert-vuln")
DATA_PATH = Path("ml/datasets/processed/devign_codebert.jsonl")

TRAINING_CONFIG = {
    "max_length": 512,
    "batch_size": 16,
    "epochs": 5,
    "learning_rate": 2e-5,
    "warmup_ratio": 0.1,
    "weight_decay": 0.01,
    "eval_steps": 500,
    "save_steps": 1000,
}

TARGET_METRICS = {
    "f1": 0.88,
    "roc_auc": 0.90,
}


# ─── Dataset ───────────────────────────────────────────────────────────────────

class DevignDataset(Dataset):
    """Devign vulnerability detection dataset."""

    def __init__(self, data: List[Dict], tokenizer: RobertaTokenizer, max_length: int = 512):
        self.data = data
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        item = self.data[idx]
        code = item["func"]
        label = item["target"]

        encoding = self.tokenizer(
            code,
            truncation=True,
            max_length=self.max_length,
            padding="max_length",
            return_tensors="pt",
        )

        return {
            "input_ids": encoding["input_ids"].squeeze(),
            "attention_mask": encoding["attention_mask"].squeeze(),
            "labels": torch.tensor(label, dtype=torch.long),
        }


# ─── Training ──────────────────────────────────────────────────────────────────

def compute_metrics(eval_pred):
    """Compute F1 and ROC-AUC for evaluation."""
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    proba = torch.softmax(torch.tensor(logits), dim=-1)[:, 1].numpy()

    f1 = f1_score(labels, predictions, average="binary")
    roc_auc = roc_auc_score(labels, proba)

    logger.info(f"F1: {f1:.4f} | ROC-AUC: {roc_auc:.4f} | Target F1: {TARGET_METRICS['f1']}")
    logger.info(f"\n{classification_report(labels, predictions, target_names=['Safe', 'Vulnerable'])}")

    return {
        "f1": f1,
        "roc_auc": roc_auc,
        "f1_target_met": f1 >= TARGET_METRICS["f1"],
    }


def load_dataset_from_disk(data_path: Path) -> Tuple[List, List, List]:
    """Load Devign dataset and split into train/val/test."""
    data = []
    with open(data_path) as f:
        for line in f:
            data.append(json.loads(line))

    # 80/10/10 split
    n = len(data)
    train = data[:int(0.8 * n)]
    val = data[int(0.8 * n):int(0.9 * n)]
    test = data[int(0.9 * n):]

    logger.info(f"Dataset: {len(train)} train | {len(val)} val | {len(test)} test")
    return train, val, test


def train(args):
    """Main training loop."""
    logger.info(f"🚀 Starting CodeBERT fine-tuning on Devign")
    logger.info(f"Model: {MODEL_NAME} | Target F1: {TARGET_METRICS['f1']}")

    # Load tokenizer and model
    tokenizer = RobertaTokenizer.from_pretrained(MODEL_NAME)
    model = RobertaForSequenceClassification.from_pretrained(
        MODEL_NAME,
        num_labels=2,
        hidden_dropout_prob=0.1,
    )

    # Load data
    train_data, val_data, test_data = load_dataset_from_disk(DATA_PATH)
    train_dataset = DevignDataset(train_data, tokenizer, TRAINING_CONFIG["max_length"])
    val_dataset = DevignDataset(val_data, tokenizer, TRAINING_CONFIG["max_length"])
    test_dataset = DevignDataset(test_data, tokenizer, TRAINING_CONFIG["max_length"])

    # Training arguments
    training_args = TrainingArguments(
        output_dir=str(OUTPUT_DIR),
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch_size,
        per_device_eval_batch_size=args.batch_size * 2,
        learning_rate=TRAINING_CONFIG["learning_rate"],
        weight_decay=TRAINING_CONFIG["weight_decay"],
        warmup_ratio=TRAINING_CONFIG["warmup_ratio"],
        eval_strategy="steps",
        eval_steps=TRAINING_CONFIG["eval_steps"],
        save_steps=TRAINING_CONFIG["save_steps"],
        load_best_model_at_end=True,
        metric_for_best_model="f1",
        greater_is_better=True,
        logging_steps=100,
        report_to="none",
        fp16=torch.cuda.is_available(),
        dataloader_num_workers=4,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics,
    )

    # Train
    logger.info("🏋️ Training CodeBERT...")
    trainer.train()

    # Evaluate on test set
    logger.info("📊 Final evaluation on test set...")
    results = trainer.evaluate(test_dataset)
    
    logger.info(f"\n{'='*50}")
    logger.info(f"FINAL RESULTS")
    logger.info(f"{'='*50}")
    logger.info(f"F1 Score: {results.get('eval_f1', 0):.4f} (target: {TARGET_METRICS['f1']})")
    logger.info(f"ROC-AUC: {results.get('eval_roc_auc', 0):.4f}")
    
    if results.get("eval_f1", 0) >= TARGET_METRICS["f1"]:
        logger.info(f"✅ TARGET METRIC MET: F1 > {TARGET_METRICS['f1']}")
    else:
        logger.info(f"⚠️  F1 below target — consider more epochs or data augmentation")

    # Save model
    trainer.save_model(str(OUTPUT_DIR / "final"))
    tokenizer.save_pretrained(str(OUTPUT_DIR / "final"))
    logger.info(f"💾 Model saved to {OUTPUT_DIR / 'final'}")

    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train CodeBERT for vulnerability detection")
    parser.add_argument("--epochs", type=int, default=TRAINING_CONFIG["epochs"])
    parser.add_argument("--batch-size", type=int, default=TRAINING_CONFIG["batch_size"])
    args = parser.parse_args()
    train(args)
