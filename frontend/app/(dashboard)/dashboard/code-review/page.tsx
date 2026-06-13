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
  MessageSquare,
  Check,
  ShieldAlert,
  ArrowLeft,
  Copy,
  ThumbsUp
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
        suggestion: "logger.info('Connecting to Qdrant cluster: [MASKED]') # Instead of printing full key"
      },
      {
        type: "performance",
        severity: "medium",
        file: "services/rag_service.py",
        line: 127,
        message: "Sequential embedding generation for batch of documents can cause queue blocks.",
        suggestion: "import asyncio\n\n# Implement concurrent retrieval\nawait asyncio.gather(*[generate_embeddings(doc) for doc in documents])"
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
        suggestion: "const getCachedKey = async (kid: string) => {\n  const cached = await redis.get(`jwk:${kid}`);\n  if (cached) return JSON.parse(cached);\n  // Fallback lookup...\n}"
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex-1 flex h-full bg-[#0B1220] overflow-hidden">
      
      {/* LEFT PANEL: PR Inbox List */}
      <div className="w-[320px] md:w-[360px] border-r border-[rgba(255,255,255,0.08)] bg-[#111827] flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between bg-[#111827]">
          <div>
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <GitPullRequest className="w-4 h-4 text-[#2563EB]" />
              PR Inbox
            </h2>
            <p className="text-[10px] text-[#94A3B8] font-mono mt-0.5">Continuous CodeBERT analysis</p>
          </div>
          <span className="px-2 py-0.5 bg-[#2563EB]/15 text-[#3B82F6] border border-[#2563EB]/20 rounded text-[9px] font-mono font-bold">
            {MOCK_PRS.length} Open
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[rgba(255,255,255,0.04)] bg-[#111827]/30">
          {MOCK_PRS.map(pr => {
            const isSelected = selectedPr.id === pr.id;
            return (
              <button
                key={pr.id}
                onClick={() => setSelectedPr(pr)}
                className={`w-full text-left p-5 transition-all relative ${
                  isSelected ? "bg-[#111827]" : "hover:bg-[#111827]/40"
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]" />
                )}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] text-[#94A3B8] font-mono">#{pr.number}</span>
                    <span className="text-[10px] text-[#94A3B8] font-mono">{pr.createdAt}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-100 line-clamp-2 leading-relaxed">
                    {pr.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    {pr.verdict === "safe" && (
                      <div className="flex items-center gap-1 text-[10px] text-[#10B981] font-semibold bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Safe</span>
                      </div>
                    )}
                    {pr.verdict === "attention" && (
                      <div className="flex items-center gap-1 text-[10px] text-[#F59E0B] font-semibold bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Attention</span>
                      </div>
                    )}
                    {pr.verdict === "block" && (
                      <div className="flex items-center gap-1 text-[10px] text-[#EF4444] font-semibold bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/20">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Block</span>
                      </div>
                    )}
                    <span className="text-[10px] text-[#94A3B8]/60 font-mono">
                      {pr.changedFiles} files
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL: Full PR Verdict Details */}
      <div className="flex-1 overflow-y-auto bg-[#0B1220]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPr.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="p-8 md:p-10 space-y-8 max-w-4xl"
          >
            {/* PR Title & Metadata */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#94A3B8]">#{selectedPr.number}</span>
                <span className="text-xs text-slate-300 font-semibold">by {selectedPr.author}</span>
                <span className="text-xs text-[#94A3B8]/60">•</span>
                <span className="text-xs text-[#94A3B8] font-mono bg-[#111827] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.06)]">
                  {selectedPr.head} → {selectedPr.base}
                </span>
              </div>

              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {selectedPr.title}
              </h1>

              <div className="flex items-center gap-5 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#94A3B8]/70" />
                  <span>{selectedPr.changedFiles} files changed</span>
                </div>
                <div className="flex gap-1.5 font-mono text-[11px] font-bold">
                  <span className="text-[#10B981]">+{selectedPr.additions} additions</span>
                  <span className="text-[#EF4444]">-{selectedPr.deletions} deletions</span>
                </div>
              </div>
            </div>

            {/* Verdict Alert Header */}
            <div className={`p-5 rounded-xl border flex items-start gap-4 ${
              selectedPr.verdict === "safe" ? "bg-[#10B981]/5 border-[#10B981]/20 text-[#10B981]" :
              selectedPr.verdict === "attention" ? "bg-[#F59E0B]/5 border-[#F59E0B]/20 text-[#F59E0B]" :
              "bg-[#EF4444]/5 border-[#EF4444]/20 text-[#EF4444]"
            }`}>
              {selectedPr.verdict === "safe" && <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />}
              {selectedPr.verdict === "attention" && <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />}
              {selectedPr.verdict === "block" && <XCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider">AI Code Review Verdict</h4>
                <p className="text-sm font-semibold mt-1 text-slate-200">{selectedPr.verdictText}</p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Analysis Summary</h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-[#111827] border border-[rgba(255,255,255,0.06)] p-5 rounded-xl">
                {selectedPr.summary}
              </p>
            </div>

            {/* Findings & Diff suggestions */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">AI CodeBERT Findings</h3>
              {selectedPr.findings.length === 0 ? (
                <div className="p-8 text-center border border-[#10B981]/20 bg-[#10B981]/5 rounded-xl space-y-2.5">
                  <Check className="w-8 h-8 text-[#10B981] mx-auto" />
                  <p className="text-sm font-bold text-slate-200">No issues flagged</p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed max-w-md mx-auto">
                    CodeBERT has verified this branch follows standard design guidelines and lacks security logic failures. Safe for direct merge.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedPr.findings.map((finding, idx) => (
                    <div key={idx} className="p-5 bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            finding.severity === "high" ? "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20" :
                            "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
                          }`}>
                            {finding.severity} severity
                          </span>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-400 border border-[rgba(255,255,255,0.04)] rounded text-[9px] font-mono">
                            {finding.type}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#94A3B8] font-mono">
                          {finding.file} : L{finding.line}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-200 leading-normal">{finding.message}</p>
                      
                      {/* Suggestion Codeblock */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-bold">Suggested fix:</span>
                          <button
                            onClick={() => copyToClipboard(finding.suggestion, `${idx}`)}
                            className="flex items-center gap-1 text-[10px] text-[#3B82F6] hover:text-white transition-colors"
                          >
                            {copiedId === `${idx}` ? (
                              <>
                                <Check className="w-3 h-3 text-[#10B981]" />
                                <span className="text-[#10B981]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy suggestion</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-lg text-xs font-mono text-[#F8FAFC] overflow-x-auto whitespace-pre leading-relaxed">
                          <code>{finding.suggestion}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions Panel */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex gap-4">
              <button 
                onClick={() => alert(`Pull Request #${selectedPr.number} has been merged.`)}
                className="flex-1 py-3 bg-[#2563EB] hover:bg-[#2563EB]/95 text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(37,99,235,0.15)] flex items-center justify-center gap-1.5"
              >
                <ThumbsUp className="w-4 h-4" />
                Merge Pull Request
              </button>
              <button 
                onClick={() => alert(`Changes requested on Pull Request #${selectedPr.number}.`)}
                className="flex-1 py-3 bg-[#111827] border border-[rgba(255,255,255,0.08)] hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-lg transition-all"
              >
                Request Changes
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
