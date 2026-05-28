"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GitPullRequest, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  ChevronRight, 
  ExternalLink,
  MessageSquare,
  Check,
  ShieldAlert,
  ArrowLeft
} from "lucide-react";

interface Finding {
  type: "vulnerability" | "performance" | "smell";
  severity: "high" | "medium" | "low";
  file: string;
  line: number;
  message: string;
  suggestion: string;
}

interface PR {
  id: string;
  number: number;
  title: string;
  author: string;
  avatar: string;
  base: string;
  head: string;
  createdAt: string;
  additions: number;
  deletions: number;
  changedFiles: number;
  verdict: "safe" | "attention" | "block";
  verdictText: string;
  summary: string;
  findings: Finding[];
}

const MOCK_PRS: PR[] = [
  {
    id: "pr-247",
    number: 247,
    title: "feat: Implement vector search with Qdrant for knowledge retrieval",
    author: "alice-chen",
    avatar: "AC",
    base: "main",
    head: "feature/qdrant-integration",
    createdAt: "2h ago",
    additions: 342,
    deletions: 89,
    changedFiles: 12,
    verdict: "attention",
    verdictText: "Needs attention — 1 security vulnerability",
    summary: "Strong implementation of the Qdrant vector search pipeline. The embedding generation is efficient, but logging configuration exposing the plain text credentials during pipeline launch creates vulnerability risks.",
    findings: [
      {
        type: "vulnerability",
        severity: "high",
        file: "services/rag_service.py",
        line: 84,
        message: "API key is logged in plain text during connection initialization.",
        suggestion: "Use logger.info('Connecting to Qdrant cluster: [MASKED]') instead of string interpolation of settings.QDRANT_API_KEY."
      },
      {
        type: "performance",
        severity: "medium",
        file: "services/rag_service.py",
        line: 127,
        message: "Sequential embedding generation for batch of documents can cause queue blocks.",
        suggestion: "Implement asyncio.gather to request embeddings concurrently from the SentenceTransformers backend."
      }
    ]
  },
  {
    id: "pr-246",
    number: 246,
    title: "fix: Migrate JWT token auth from HS256 to asymmetric RS256 keys",
    author: "bob-kumar",
    avatar: "BK",
    base: "main",
    head: "fix/auth-jwt-migration",
    createdAt: "5h ago",
    additions: 112,
    deletions: 45,
    changedFiles: 6,
    verdict: "block",
    verdictText: "Block — missing public key endpoint validation in gateway",
    summary: "The migration of JWT tokens to asymmetric keys is correct in the auth-service, but the api-gateway changes are missing the fallback JWKS cache endpoint, which will crash the gateway during network drops.",
    findings: [
      {
        type: "vulnerability",
        severity: "high",
        file: "src/plugins/auth.ts",
        line: 42,
        message: "JWKS lookup has no cache fallback. Disconnection from auth-service blocks all gateway requests.",
        suggestion: "Implement local redis caching layer with 1-hour TTL for the public certificates key registry."
      }
    ]
  },
  {
    id: "pr-245",
    number: 245,
    title: "perf: Optimize postgresql indexes for transaction querying",
    author: "sarah-williams",
    avatar: "SW",
    base: "main",
    head: "perf/postgres-indexing",
    createdAt: "1d ago",
    additions: 68,
    deletions: 12,
    changedFiles: 3,
    verdict: "safe",
    verdictText: "Safe to merge — no critical issues detected",
    summary: "Excellent composite index configurations added to transaction query tables. Target queries reduced execution duration by 72ms. Zero bugs or vulnerabilities detected.",
    findings: []
  }
];

export default function CodeReviewPage() {
  const [selectedPr, setSelectedPr] = useState<PR>(MOCK_PRS[0]);

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0B0F14]">
      
      {/* LEFT PANEL: PR Inbox List */}
      <div className="w-[320px] md:w-[380px] border-r border-[rgba(255,255,255,0.06)] bg-[#121826]/20 flex flex-col flex-shrink-0">
        <div className="p-4.5 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <GitPullRequest className="w-4 h-4 text-blue" />
              PR Inbox
            </h2>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Continuous CodeBERT analysis</p>
          </div>
          <span className="px-2 py-0.5 bg-blue/15 text-blue border border-blue/20 rounded text-[9px] font-bold">
            {MOCK_PRS.length} Tasks
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[rgba(255,255,255,0.04)]">
          {MOCK_PRS.map(pr => {
            const isSelected = selectedPr.id === pr.id;
            return (
              <button
                key={pr.id}
                onClick={() => setSelectedPr(pr)}
                className={`w-full text-left p-4.5 transition-colors relative ${
                  isSelected ? "bg-[#121826]" : "hover:bg-[#121826]/40"
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue" />
                )}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">#{pr.number}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{pr.createdAt}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-200 line-clamp-2 leading-snug">
                    {pr.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    {pr.verdict === "safe" && (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Safe to merge</span>
                      </div>
                    )}
                    {pr.verdict === "attention" && (
                      <div className="flex items-center gap-1 text-[10px] text-amber-400 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Needs attention</span>
                      </div>
                    )}
                    {pr.verdict === "block" && (
                      <div className="flex items-center gap-1 text-[10px] text-rose-400 font-medium">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Block</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL: Full PR Verdict Details */}
      <div className="flex-1 overflow-y-auto bg-[#0b0f14]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPr.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 space-y-6 max-w-4xl"
          >
            {/* PR Title & Metadata */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500">#{selectedPr.number}</span>
                <span className="text-xs text-slate-400 font-medium">by {selectedPr.author}</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-500 font-mono bg-slate-800/40 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.03)]">
                  {selectedPr.head} → {selectedPr.base}
                </span>
              </div>

              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {selectedPr.title}
              </h1>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-slate-400">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>{selectedPr.changedFiles} files changed</span>
                </div>
                <div className="flex gap-1.5 font-mono text-[10px] font-bold">
                  <span className="text-emerald-400">+{selectedPr.additions}</span>
                  <span className="text-rose-400">-{selectedPr.deletions}</span>
                </div>
              </div>
            </div>

            {/* Verdict Alert Header */}
            <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              selectedPr.verdict === "safe" ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300" :
              selectedPr.verdict === "attention" ? "bg-amber-500/5 border-amber-500/20 text-amber-300" :
              "bg-rose-500/5 border-rose-500/20 text-rose-300"
            }`}>
              {selectedPr.verdict === "safe" && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />}
              {selectedPr.verdict === "attention" && <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />}
              {selectedPr.verdict === "block" && <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">AI Code Review Verdict</h4>
                <p className="text-sm font-semibold mt-1 text-slate-200">{selectedPr.verdictText}</p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary</h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-[#121826] border border-[rgba(255,255,255,0.05)] p-4 rounded-xl">
                {selectedPr.summary}
              </p>
            </div>

            {/* Findings & Diff suggestions */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Findings</h3>
              {selectedPr.findings.length === 0 ? (
                <div className="p-6 text-center border border-emerald-500/20 bg-emerald-500/5 rounded-xl space-y-2">
                  <Check className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="text-sm font-bold text-slate-200">No issues flagged</p>
                  <p className="text-xs text-slate-400">CodeBERT has verified this branch follows standard design guidelines and lacks security logic failures.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedPr.findings.map((finding, idx) => (
                    <div key={idx} className="p-5 bg-[#121826] border border-[rgba(255,255,255,0.05)] rounded-xl space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          finding.severity === "high" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                          "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {finding.severity} severity
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {finding.file} : line {finding.line}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-semibold">{finding.message}</p>
                      
                      {/* Suggestion Codeblock */}
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Suggested fix:</span>
                        <pre className="p-3 bg-[#0b0f14] border border-[rgba(255,255,255,0.04)] rounded-lg text-xs font-mono text-slate-300 overflow-x-auto">
                          <code>{finding.suggestion}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions Panel */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex gap-3">
              <button className="flex-1 py-2.5 bg-blue hover:bg-blue-hover text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                Merge Pull Request
              </button>
              <button className="flex-1 py-2.5 bg-slate-900 border border-[rgba(255,255,255,0.06)] hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-colors">
                Request Changes
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
