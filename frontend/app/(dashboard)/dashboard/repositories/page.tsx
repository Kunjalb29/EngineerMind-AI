"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Folder, 
  GitPullRequest, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  ChevronRight, 
  Plus, 
  Search,
  BookOpen
} from "lucide-react";
import Link from "next/link";

const REPO_STORIES = [
  {
    id: "repo-1",
    name: "api-gateway",
    lang: "TypeScript",
    status: "warning",
    statusText: "1 security alert pending",
    description: "High-performance API gateway with rate limiting, auth, and intelligent proxy routing.",
    changes: "Alice Chen migrated token verification to RS256 to address credentials caching. Bob Kumar fixed route rewrite limits.",
    attention: "PR #247 (RAG integration) contains 1 plain-text API key log in console output.",
    contributors: ["AC", "BK", "SW", "DK"],
    activity: "Active",
    lastCommit: "2h ago",
  },
  {
    id: "repo-2",
    name: "ml-pipeline",
    lang: "Python",
    status: "stable",
    statusText: "All pipelines passing",
    description: "End-to-end ML training and inference pipeline containing CodeBERT embeddings & XGBoost.",
    changes: "Trained code classification matrix on 5GB security CVE data. Achieved F1 score > 0.88.",
    attention: "No critical blockers. 2 warning flags about unused python dependencies in requirements.",
    contributors: ["AC", "SW", "DK"],
    activity: "Idle",
    lastCommit: "5h ago",
  },
  {
    id: "repo-3",
    name: "frontend-app",
    lang: "TypeScript",
    status: "stable",
    statusText: "Vercel deploy green",
    description: "Next.js 16 frontend workspace designed with Aurora Forge blue palette.",
    changes: "Redesigned layout components. Deleted legacy widescreen topbars. Cleaned grid configurations.",
    attention: "3 branches are currently stale (more than 14 days without commits).",
    contributors: ["BK", "AC", "DK", "SM"],
    activity: "High Activity",
    lastCommit: "1h ago",
  },
  {
    id: "repo-4",
    name: "auth-service",
    lang: "Go",
    status: "stable",
    statusText: "Audit passing",
    description: "High-throughput token issuer and authorization microservice using Redis backplane.",
    changes: "Integrated OAuth client state callbacks. Optimized token verification latency by 4.2ms.",
    attention: "Requires standard patch update for base golang docker image.",
    contributors: ["AC", "BK"],
    activity: "Stable",
    lastCommit: "1d ago",
  },
  {
    id: "repo-5",
    name: "data-processor",
    lang: "Python",
    status: "critical",
    statusText: "3 pipeline failures",
    description: "Async worker consuming Kafka topics to persist structured codebase summaries.",
    changes: "Bob restructured DB schemas for batch upserts. Memory pool limits configured.",
    attention: "Async processing fails intermittently during high-throughput Kafka peaks.",
    contributors: ["SW", "BK"],
    activity: "Failing",
    lastCommit: "3d ago",
  }
];

export default function RepositoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = REPO_STORIES.filter(repo => 
    repo.name.toLowerCase().includes(search.toLowerCase()) || 
    repo.lang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#0B0F14] overflow-hidden">
      {/* Page Header */}
      <header className="h-14 border-b border-[rgba(255,255,255,0.06)] px-6 flex items-center justify-between bg-[#121826]/40 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-blue" />
          <span className="text-sm font-semibold text-slate-200">Repository Stories</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#121826] text-xs">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search repositories..."
              className="bg-transparent text-xs text-slate-200 placeholder-slate-500 outline-none w-40"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue hover:bg-blue-hover text-white text-xs font-semibold rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Connect Repo
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Codebase Health & Stories</h2>
          <p className="text-xs text-slate-400">Continuous context extraction. Telling you what changed, who is working, and what needs immediate attention.</p>
        </div>

        {/* Stories List */}
        <div className="space-y-4">
          {filtered.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="p-5 bg-[#121826] border border-[rgba(255,255,255,0.05)] rounded-xl hover:border-blue/35 transition-all duration-200 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 1. Meta Column (Colspan 3) */}
                <div className="lg:col-span-3 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-[rgba(255,255,255,0.06)] flex items-center justify-center">
                      <Folder className="w-4 h-4 text-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue transition-colors">
                        {repo.name}
                      </h3>
                      <span className="text-[10px] text-slate-500 font-mono">{repo.lang}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {repo.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className={`w-2 h-2 rounded-full ${
                      repo.status === "stable" ? "bg-emerald-500" :
                      repo.status === "warning" ? "bg-amber-500 animate-pulse" :
                      "bg-rose-500 animate-ping"
                    }`} />
                    <span className="text-[10px] text-slate-400 font-mono">{repo.statusText}</span>
                  </div>
                </div>

                {/* 2. Changes Column (Colspan 4) */}
                <div className="lg:col-span-4 space-y-1 bg-[#0b0f14]/50 p-4.5 rounded-lg border border-[rgba(255,255,255,0.03)]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Recent Changes
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {repo.changes}
                  </p>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono pt-2">
                    <Clock className="w-3 h-3 text-slate-600" />
                    Last update {repo.lastCommit}
                  </div>
                </div>

                {/* 3. Attention Column (Colspan 3) */}
                <div className="lg:col-span-3 space-y-1 bg-[#0b0f14]/50 p-4.5 rounded-lg border border-[rgba(255,255,255,0.03)]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Needs Attention
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {repo.attention}
                  </p>
                </div>

                {/* 4. Action & Contributors Column (Colspan 2) */}
                <div className="lg:col-span-2 flex flex-col justify-between h-full space-y-4 lg:text-right lg:items-end">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Contributors
                    </span>
                    <div className="flex -space-x-1.5 justify-start lg:justify-end">
                      {repo.contributors.map((c, idx) => (
                        <div 
                          key={idx} 
                          className="w-6 h-6 rounded-full bg-slate-800 border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[9px] font-bold text-slate-300 font-mono"
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1 text-xs text-blue hover:text-blue-hover font-semibold transition-colors mt-auto"
                  >
                    <span>Ask AI</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
