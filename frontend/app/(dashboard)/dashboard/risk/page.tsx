"use client";

import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Clock, 
  Layers,
  Cpu
} from "lucide-react";
import Link from "next/link";

interface Recommendation {
  action: string;
  impact: string;
  id: string;
}

const ACTIONABLE_RECOMMENDATIONS: Recommendation[] = [
  { id: "rec-1", action: "Reassign tickets ENG-234 & ENG-235 from Alice Chen to Bob Kumar", impact: "Reduces RAG pipeline timeline block likelihood by 34%" },
  { id: "rec-2", action: "Unblock Sandbox integration endpoint credentials", impact: "Resolves api-gateway external connection delay" },
  { id: "rec-3", action: "Clean up symmetric HS256 legacy verification middleware", impact: "Reduces auth-service technical debt score by 15pts" }
];

export default function RiskPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#0B0F14] overflow-hidden">
      
      {/* Page Header */}
      <header className="h-14 border-b border-[rgba(255,255,255,0.06)] px-6 flex items-center justify-between bg-[#121826]/40 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-blue" />
          <span className="text-sm font-semibold text-slate-200">Risk Signals</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-800/40 px-2.5 py-1 rounded-md border border-[rgba(255,255,255,0.04)]">
          <Cpu className="w-3.5 h-3.5 text-slate-500" />
          Model: XGBoost v2.1 (91% ROC-AUC)
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-4xl">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Sprint Risk Assessment</h2>
          <p className="text-xs text-slate-400">Continuous queue density audit. Real-time predictions of sprint delays and delivery failures.</p>
        </div>

        {/* 1. Large Top Hero Signal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-4"
        >
          <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>⚠ Moderate Risk — Sprint 24 Delivery</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            Alice Chen currently has 8 pending backlog items. If the Qdrant RAG pipeline integration is not unblocked by Monday afternoon, the team will likely miss the Sprint 24 launch goal.
          </p>

          <div className="h-[1px] bg-[rgba(255,255,255,0.06)]" />

          {/* Recommended Actions inside Hero */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Recommended Actions:</span>
            <div className="space-y-1.5">
              {ACTIONABLE_RECOMMENDATIONS.map(rec => (
                <div key={rec.id} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-4 h-4 text-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200">{rec.action}</span>
                    <span className="text-[10px] text-slate-500 block">{rec.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 2. Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Queue Density & Bottleneck Block */}
          <div className="p-5 bg-[#121826] border border-[rgba(255,255,255,0.05)] rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue" />
              Queue Bottleneck Audit
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#0b0f14]/50 border border-[rgba(255,255,255,0.03)] rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-200">Alice Chen</div>
                  <span className="text-[10px] text-slate-500">Domain: ML / Python</span>
                </div>
                <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded text-[9px] font-bold font-mono">
                  8 Tasks (Heavy Load)
                </span>
              </div>
              <div className="p-3 bg-[#0b0f14]/50 border border-[rgba(255,255,255,0.03)] rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-200">Bob Kumar</div>
                  <span className="text-[10px] text-slate-500">Domain: Frontend / TS</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-bold font-mono">
                  1 Task (Idle)
                </span>
              </div>
            </div>
          </div>

          {/* Technical Debt Warnings */}
          <div className="p-5 bg-[#121826] border border-[rgba(255,255,255,0.05)] rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue" />
              Technical Debt Signal
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs items-center p-1 border-b border-[rgba(255,255,255,0.04)]">
                <span className="text-slate-400">auth-service (Legacy verification)</span>
                <span className="font-mono text-amber-500 font-bold">35% debt</span>
              </div>
              <div className="flex justify-between text-xs items-center p-1 border-b border-[rgba(255,255,255,0.04)]">
                <span className="text-slate-400">api-gateway (Redis pools logic)</span>
                <span className="font-mono text-emerald-400 font-bold">12% debt</span>
              </div>
              <div className="flex justify-between text-xs items-center p-1 border-b border-[rgba(255,255,255,0.04)]">
                <span className="text-slate-400">ml-pipeline (SentenceTransformers evaluation)</span>
                <span className="font-mono text-emerald-400 font-bold">28% debt</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Actions Footer Panel */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex gap-3">
          <Link
            href="/dashboard"
            className="flex-1 py-2.5 bg-blue hover:bg-blue-hover text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(37,99,235,0.2)] text-center flex items-center justify-center gap-1.5"
          >
            <span>Mitigate via AI Copilot</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
