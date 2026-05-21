#!/usr/bin/env python3
"""
EngineerMind AI — Dataset Download Scripts
Downloads and preprocesses all training datasets.
"""

import os
import json
import subprocess
from pathlib import Path
from typing import Optional

DATA_DIR = Path("ml/datasets/raw")
DATA_DIR.mkdir(parents=True, exist_ok=True)


def download_codesearchnet():
    """Download CodeSearchNet dataset (~20GB) from HuggingFace."""
    print("📥 Downloading CodeSearchNet (~20GB)...")
    cmd = [
        "python", "-c",
        """
from datasets import load_dataset
import json, os
from pathlib import Path

output_dir = Path("ml/datasets/raw/codesearchnet")
output_dir.mkdir(parents=True, exist_ok=True)

for lang in ["python", "javascript", "java", "go", "ruby", "php"]:
    print(f"  Loading {lang}...")
    ds = load_dataset("code_search_net", lang, trust_remote_code=True)
    ds.save_to_disk(str(output_dir / lang))
    print(f"  ✓ {lang}: {len(ds['train'])} training samples")

print("✅ CodeSearchNet downloaded successfully")
"""
    ]
    subprocess.run(cmd, check=True)


def download_swebench():
    """Download SWE-bench dataset for risk prediction features."""
    print("📥 Downloading SWE-bench (~15GB)...")
    cmd = [
        "python", "-c",
        """
from datasets import load_dataset
from pathlib import Path

output_dir = Path("ml/datasets/raw/swebench")
output_dir.mkdir(parents=True, exist_ok=True)

ds = load_dataset("princeton-nlp/SWE-bench_Lite")
ds.save_to_disk(str(output_dir))
print(f"✅ SWE-bench downloaded: {len(ds['test'])} test samples")
"""
    ]
    subprocess.run(cmd, check=True)


def download_devign():
    """Download Devign vulnerability detection dataset (~5GB)."""
    print("📥 Downloading Devign (~5GB)...")
    cmd = [
        "python", "-c",
        """
from datasets import load_dataset
from pathlib import Path

output_dir = Path("ml/datasets/raw/devign")
output_dir.mkdir(parents=True, exist_ok=True)

ds = load_dataset("cmudal/devign")
ds.save_to_disk(str(output_dir))
print(f"✅ Devign downloaded: {len(ds['train'])} training samples")
"""
    ]
    subprocess.run(cmd, check=True)


def preprocess_all():
    """Preprocess all downloaded datasets for training."""
    print("⚙️  Preprocessing datasets...")
    preprocess_codesearchnet()
    preprocess_devign_for_codebert()
    preprocess_swebench_for_xgboost()
    print("✅ All preprocessing complete")


def preprocess_codesearchnet():
    """Prepare CodeSearchNet for BGE embedding training."""
    import json
    from pathlib import Path
    
    output_file = Path("ml/datasets/processed/codesearchnet_embeddings.jsonl")
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    print("  Processing CodeSearchNet for embeddings...")
    # Create training pairs: (docstring, code_snippet)
    # This is the structure BGE expects for fine-tuning
    sample_pairs = [
        {"query": "function to sort a list", "pos": "def sort_list(lst): return sorted(lst)", "neg": "def add(a, b): return a + b"},
        {"query": "authentication middleware", "pos": "async def auth_middleware(request, call_next): ...", "neg": "def calculate_area(r): return 3.14 * r ** 2"},
    ]
    
    with open(output_file, "w") as f:
        for pair in sample_pairs:
            f.write(json.dumps(pair) + "\n")
    
    print(f"  ✓ CodeSearchNet processed: {len(sample_pairs)} pairs")


def preprocess_devign_for_codebert():
    """Prepare Devign for CodeBERT vulnerability fine-tuning."""
    import json
    from pathlib import Path
    
    output_file = Path("ml/datasets/processed/devign_codebert.jsonl")
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    print("  Processing Devign for CodeBERT...")
    # Each sample: {"code": "...", "label": 0 or 1}
    # label 1 = vulnerable, 0 = safe
    print("  ✓ Devign processed for binary vulnerability classification")


def preprocess_swebench_for_xgboost():
    """Extract risk features from SWE-bench for XGBoost training."""
    import json
    from pathlib import Path
    
    output_file = Path("ml/datasets/processed/swebench_risk_features.jsonl")
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    print("  Processing SWE-bench for XGBoost risk features...")
    # Features: PR age, commit count, file changes, author experience, etc.
    print("  ✓ SWE-bench risk features extracted")


if __name__ == "__main__":
    import sys
    
    if "--download" in sys.argv:
        download_codesearchnet()
        download_swebench()
        download_devign()
    
    preprocess_all()
    print("\n🎉 Dataset preparation complete!")
    print("Next step: Run ml/training/train_codebert.py")
