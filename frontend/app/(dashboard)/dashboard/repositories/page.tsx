"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  GitBranch, 
  Users, 
  Activity, 
  GitPullRequest, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight
} from "lucide-react";

const TABS = ["Overview", "Activity", "Pull Requests", "Architecture", "Contributors"];

const MOCK_REPOS = [
  { id: "api-gateway", name: "api-gateway", lang: "TypeScript" },
  { id: "ml-pipeline", name: "ml-pipeline", lang: "Python" }
];

export default function RepositoriesPage() {
  const [activeRepo, setActiveRepo] = useState("api-gateway");
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full h-full flex flex-col bg-[#0B1220] overflow-hidden">
      
      {/* Top Header Selector */}
      <header className="h-14 border-b border-[rgba(255,255,255,0.08)] bg-[#111827]/40 px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Folder className="w-4.5 h-4.5 text-[#2563EB]" />
          <div className="flex gap-2">
            {MOCK_REPOS.map(repo => (
              <button
                key={repo.id}
                onClick={() => setActiveRepo(repo.id)}
                className={`px-3 py-1 rounded text-xs font-semibold border transition-all cursor-pointer ${
                  activeRepo === repo.id 
                    ? "border-[#2563EB] bg-[#2563EB]/10 text-white" 
                    : "border-[rgba(255,255,255,0.08)] bg-transparent text-[#94A3B8] hover:text-white"
                }`}
              >
                {repo.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* GitHub-inspired Navigation Tabs */}
      <div className="px-6 border-b border-[rgba(255,255,255,0.08)] bg-[#111827]/30 flex-shrink-0">
        <div className="flex gap-4">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer relative ${
                activeTab === tab 
                  ? "border-[#2563EB] text-white" 
                  : "border-transparent text-[#94A3B8] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content panel */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <motion.div
                key="Overview"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-6"
              >
                {/* Health Warning Header Banner */}
                <div className="p-5 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl flex items-center justify-between shadow-md">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block">Repository Health</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
                      <span className="text-sm font-bold text-slate-100">Healthy · 2 Issues Need Attention</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 text-[10px] font-mono rounded font-bold">
                      Warning Flagged
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Changes summary */}
                  <div className="p-5 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Changes</h3>
                    <div className="space-y-3.5 text-xs text-[#94A3B8] leading-relaxed">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-200 block">Migrated verify verification to RS256</span>
                        <p>Alice Chen cleaned up legacy HS256 auth symmetric signatures after credential exposure vulnerability checks.</p>
                      </div>
                      <div className="space-y-1 border-t border-[rgba(255,255,255,0.04)] pt-3">
                        <span className="font-bold text-slate-200 block">Configured rate limiting Redis pools</span>
                        <p>Bob Kumar added sliding window proxy middlewares inFastify to regulate client route queries.</p>
                      </div>
                    </div>
                  </div>

                  {/* Active Contributors */}
                  <div className="p-5 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Contributors</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Alice Chen", role: "Auth Refactor Lead", commits: "18 commits" },
                        { name: "Bob Kumar", role: "Routing Middleware Proxy", commits: "12 commits" },
                        { name: "Sarah Williams", role: "Integration Tests suite", commits: "5 commits" }
                      ].map(person => (
                        <div key={person.name} className="flex items-center justify-between text-xs bg-[#0B1220]/40 p-2.5 rounded border border-[rgba(255,255,255,0.03)]">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center font-bold text-[10px] font-mono">
                              {person.name.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-slate-200 block">{person.name}</span>
                              <span className="text-[9px] text-slate-500 block">{person.role}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-[#94A3B8] font-mono">{person.commits}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Commit Timeline Feed */}
                <div className="p-5 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Commit Timeline</h3>
                  <div className="relative border-l border-[rgba(255,255,255,0.06)] pl-4 ml-2 space-y-4">
                    {[
                      { msg: "fix: resolve credentials mask logger output crash", date: "2h ago", author: "alice-chen" },
                      { msg: "feat: add local redis cert cache fallback verify route", date: "5h ago", author: "alice-chen" },
                      { msg: "refactor: clean up Fastify router plugin imports", date: "1d ago", author: "bob-kumar" }
                    ].map((c, i) => (
                      <div key={i} className="text-xs text-[#94A3B8] relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-[#111827] border border-[#2563EB] rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-[#2563EB] rounded-full" />
                        </div>
                        <span className="font-mono text-slate-300 font-bold block">{c.msg}</span>
                        <span className="text-[10px] text-slate-500">{c.author} • {c.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* Other static tabs */}
            {activeTab !== "Overview" && (
              <motion.div
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center text-xs text-[#94A3B8] font-mono"
              >
                No active details configured for {activeTab}. Check Overview for health status.
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
