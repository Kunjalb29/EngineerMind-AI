"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Clock, 
  Layers,
  Cpu,
  Check,
  Zap,
  Info,
  X
} from "lucide-react";

interface RiskItem {
  id: string;
  title: string;
  category: "Codebase" | "Team Load" | "Infrastructure" | "Security";
  priority: "critical" | "high" | "medium" | "low";
  description: string;
  impact: string;
  mitigation: string;
  actionText: string;
}

const MOCK_RISKS: RiskItem[] = [
  {
    id: "risk-1",
    title: "Auth Integration Pipeline Deadlock Risk",
    category: "Codebase",
    priority: "critical",
    description: "Parallel thread pool execution blocks Auth microservice gateway because of database connection count constraints. Connection timeouts exceed 15s under high concurrency loads.",
    impact: "Auth service failure under production workload. Predicted 3-day delivery delay.",
    mitigation: "Adopt async database pool timeouts and configure strangler gateway to scale connection limits.",
    actionText: "Fix Connection Pool"
  },
  {
    id: "risk-2",
    title: "Developer Workload Queue Overload (Alice Chen)",
    category: "Team Load",
    priority: "high",
    description: "Alice has 8 open blocker items. Critical path integration tasks for Qdrant RAG core are queue-blocked. Sprint target likelihood drops to 14% if unmitigated.",
    impact: "Sprint 24 delay. RAG vector indexing pipeline release targets will be missed.",
    mitigation: "Reassign tickets ENG-234 & ENG-235 from Alice Chen to Bob Kumar who has low load.",
    actionText: "Rebalance Workload"
  },
  {
    id: "risk-3",
    title: "Unblocked Sandbox Webhook Race Condition",
    category: "Infrastructure",
    priority: "medium",
    description: "Duplicate webhook events trigger concurrent transactions in the database, potentially leading to race conditions in client billing sandbox environments.",
    impact: "Billing inconsistencies and sandbox database locks during load testing.",
    mitigation: "Implement redis-based transactional lock flag with a 5-second TTL on incoming webhook request IDs.",
    actionText: "Apply Redis Lock Patch"
  },
  {
    id: "risk-4",
    title: "Technical Debt Accumulation (Legacy HS256)",
    category: "Security",
    priority: "low",
    description: "Legacy HS256 auth routes are still active in gateway and represent security technical debt that should be clean-deprecated post-RS256 migration.",
    impact: "Security compliance auditing will report secondary authentication pathways as warning alerts.",
    mitigation: "Clean up HS256 legacy verification middleware files and remove unused key configurations.",
    actionText: "Schedule Deprecation"
  }
];

export default function RiskPage() {
  const [risks, setRisks] = useState<RiskItem[]>(MOCK_RISKS);
  const [activeTab, setActiveTab] = useState<"all" | "critical-high" | "medium-low">("all");
  const [mitigatingId, setMitigatingId] = useState<string | null>(null);
  const [mitigatedIds, setMitigatedIds] = useState<string[]>([]);

  const handleMitigate = (id: string) => {
    setMitigatingId(id);
  };

  const confirmMitigation = (id: string) => {
    setMitigatedIds(prev => [...prev, id]);
    setMitigatingId(null);
  };

  const filteredRisks = risks.filter(risk => {
    if (activeTab === "critical-high") {
      return risk.priority === "critical" || risk.priority === "high";
    }
    if (activeTab === "medium-low") {
      return risk.priority === "medium" || risk.priority === "low";
    }
    return true;
  });

  const selectedMitigationRisk = risks.find(r => r.id === mitigatingId);

  return (
    <div className="w-full h-full bg-[#0B1220] text-[#F8FAFC] overflow-y-auto min-h-screen">
      <div className="content-container py-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <AlertTriangle className="w-6 h-6 text-[#2563EB]" />
              Risk Prediction Engine
            </h1>
            <p className="text-sm text-[#94A3B8] mt-1">
              Machine learning models evaluating queue density, technical debt accumulation, and developer overload alerts.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-mono bg-[#111827] px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)]">
            <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
            Model: XGBoost v2.1 (91% ROC-AUC)
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-[rgba(255,255,255,0.06)] gap-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "all"
                ? "border-[#2563EB] text-[#F8FAFC]"
                : "border-transparent text-[#94A3B8] hover:text-slate-300"
            }`}
          >
            All Risk Alerts ({risks.filter(r => !mitigatedIds.includes(r.id)).length})
          </button>
          <button
            onClick={() => setActiveTab("critical-high")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "critical-high"
                ? "border-[#2563EB] text-[#F8FAFC]"
                : "border-transparent text-[#94A3B8] hover:text-slate-300"
            }`}
          >
            Critical & High ({risks.filter(r => (r.priority === "critical" || r.priority === "high") && !mitigatedIds.includes(r.id)).length})
          </button>
          <button
            onClick={() => setActiveTab("medium-low")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "medium-low"
                ? "border-[#2563EB] text-[#F8FAFC]"
                : "border-transparent text-[#94A3B8] hover:text-slate-300"
            }`}
          >
            Medium & Low ({risks.filter(r => (r.priority === "medium" || r.priority === "low") && !mitigatedIds.includes(r.id)).length})
          </button>
        </div>

        {/* Risks List Container */}
        <div className="space-y-6">
          {filteredRisks.map((risk) => {
            const isMitigated = mitigatedIds.includes(risk.id);
            return (
              <motion.div
                key={risk.id}
                layout
                className={`card-flat p-6 transition-all ${
                  isMitigated ? "opacity-40 select-none border-dashed" : "hover:border-[#2563EB]/30"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    {/* Badge Row */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                        risk.priority === "critical" ? "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20" :
                        risk.priority === "high" ? "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20" :
                        risk.priority === "medium" ? "bg-[#2563EB]/10 text-[#3B82F6] border border-[#2563EB]/20" :
                        "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20"
                      }`}>
                        {risk.priority}
                      </span>
                      <span className="text-[10px] text-[#94A3B8]/60 font-mono">Category: {risk.category}</span>
                      {isMitigated && (
                        <span className="flex items-center gap-1 text-[9px] text-[#10B981] font-bold font-mono ml-2">
                          <CheckCircle2 className="w-3 h-3" />
                          Mitigated
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-slate-100">{risk.title}</h3>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                      {risk.description}
                    </p>

                    {/* Detail bullets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px] text-[#94A3B8]">
                      <div className="flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-200">Predicted Impact:</span> {risk.impact}
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-200">Suggested Action:</span> {risk.mitigation}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fix Button */}
                  <div className="flex-shrink-0 self-end md:self-start">
                    {!isMitigated ? (
                      <button
                        onClick={() => handleMitigate(risk.id)}
                        className={`px-4 py-2 bg-[#111827] hover:bg-[#2563EB] text-[#F8FAFC] border border-[rgba(255,255,255,0.08)] hover:border-[#2563EB] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(37,99,235,0.02)]`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{risk.actionText}</span>
                      </button>
                    ) : (
                      <div className="text-xs text-[#94A3B8] font-mono px-3 py-1.5 bg-[#0B1220] rounded border border-[rgba(255,255,255,0.04)]">
                        Resolved
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Mitigation Drawer Overlay */}
        <AnimatePresence>
          {mitigatingId && selectedMitigationRisk && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-xl shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="p-5 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Mitigation Plan</span>
                  </div>
                  <button
                    onClick={() => setMitigatingId(null)}
                    className="p-1 hover:bg-[#0B1220] rounded-md transition-colors"
                  >
                    <X className="w-4 h-4 text-[#94A3B8]" />
                  </button>
                </div>

                {/* Plan Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#94A3B8]/60 font-mono block">Active Risk Target</span>
                    <h4 className="text-sm font-bold text-slate-100">{selectedMitigationRisk.title}</h4>
                  </div>

                  <div className="p-4 bg-[#0B1220] border border-[rgba(255,255,255,0.04)] rounded-lg space-y-2">
                    <span className="text-[10px] text-[#2563EB] font-bold block font-mono">AI Recommended Execution:</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      {selectedMitigationRisk.mitigation}
                    </p>
                  </div>

                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    Executing this action will automatically generate pull requests, re-assign tickets in Jira databases, or push pipeline updates. Confirming maps this risk as resolved.
                  </p>
                </div>

                {/* Actions */}
                <div className="p-5 border-t border-[rgba(255,255,255,0.08)] bg-[#0B1220]/40 flex gap-3">
                  <button
                    onClick={() => confirmMitigation(selectedMitigationRisk.id)}
                    className="flex-1 py-2 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white text-xs font-bold rounded-lg transition-all shadow-[0_0_12px_rgba(37,99,235,0.2)]"
                  >
                    Apply Mitigation Now
                  </button>
                  <button
                    onClick={() => setMitigatingId(null)}
                    className="flex-1 py-2 bg-[#111827] border border-[rgba(255,255,255,0.08)] hover:border-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
