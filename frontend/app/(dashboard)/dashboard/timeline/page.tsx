"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Topbar from "@/components/dashboard/Topbar";

const EVENTS = [
  {
    id: 1, type: "meeting", icon: "🎙️", title: "Sprint 24 Planning",
    description: "54-min planning session · 5 participants · 23 action items identified",
    time: "Dec 9 · 10:00 AM", color: "#00B67A", actor: "Alice Chen",
  },
  {
    id: 2, type: "commit", icon: "◉", title: "feat: Initialize RAG pipeline",
    description: "alice-chen · api-gateway · +234 -12 lines",
    time: "Dec 9 · 2:30 PM", color: "#2F6BFF", actor: "alice-chen",
  },
  {
    id: 3, type: "pr", icon: "🔀", title: "PR #247: Qdrant vector search integration",
    description: "342 additions · 89 deletions · 12 files changed · AI score: 87/100",
    time: "Dec 9 · 4:15 PM", color: "#D4A017", actor: "alice-chen",
  },
  {
    id: 4, type: "review", icon: "🔍", title: "AI Code Review Complete",
    description: "1 vulnerability · 2 performance issues · Ready for human review",
    time: "Dec 9 · 4:17 PM", color: "#FF9F0A", actor: "EngineerMind AI",
  },
  {
    id: 5, type: "commit", icon: "◉", title: "fix: Resolve race condition in webhooks",
    description: "bob-kumar · auth-service · +67 -23 lines",
    time: "Dec 9 · 5:00 PM", color: "#2F6BFF", actor: "bob-kumar",
  },
  {
    id: 6, type: "pr", icon: "🔀", title: "PR #246 merged to main",
    description: "Race condition fix approved and merged · CI/CD triggered",
    time: "Dec 9 · 6:30 PM", color: "#00B67A", actor: "sarah-williams",
  },
  {
    id: 7, type: "deploy", icon: "🚀", title: "v2.4.1 deployed to staging",
    description: "All tests passing · 87.3% coverage · Deploy time: 3m 42s",
    time: "Dec 9 · 7:00 PM", color: "#00B67A", actor: "CI/CD Pipeline",
  },
  {
    id: 8, type: "deploy", icon: "🚀", title: "v2.4.1 promoted to production",
    description: "Zero-downtime deployment · Health checks passing · Rollback ready",
    time: "Dec 9 · 7:45 PM", color: "#00B67A", actor: "CI/CD Pipeline",
  },
];

const EVENT_COLORS: Record<string, string> = {
  meeting: "border-success bg-success/10",
  commit: "border-blue bg-blue/10",
  pr: "border-accent bg-accent-muted",
  review: "border-warning bg-warning/10",
  deploy: "border-success bg-success/10",
};

export default function TimelinePage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Commits", "PRs", "Meetings", "Deployments"];

  const filtered = filter === "All" ? EVENTS : EVENTS.filter(e => {
    if (filter === "Commits") return e.type === "commit";
    if (filter === "PRs") return e.type === "pr" || e.type === "review";
    if (filter === "Meetings") return e.type === "meeting";
    if (filter === "Deployments") return e.type === "deploy";
    return true;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Engineering Timeline" subtitle="Unified event timeline across all sources" />
      
      <main className="flex-1 overflow-y-auto p-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">Engineering Timeline</h2>
              <p className="text-sm text-text-secondary">Meeting → Commit → PR → Review → Deploy — unified view</p>
            </div>
            <div className="flex items-center gap-2 p-1 bg-elevated rounded-xl">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    filter === f ? "bg-surface text-text-primary shadow-card" : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[22px] top-0 bottom-0 w-px bg-border" />
              
              <div className="space-y-4">
                {filtered.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex gap-5 items-start"
                  >
                    {/* Icon node */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border ${EVENT_COLORS[event.type]} z-10 relative`}
                    >
                      {event.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 card p-4 rounded-2xl group hover:border-blue/20 transition-all cursor-pointer mt-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-blue transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-xs text-text-muted leading-relaxed">{event.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[10px] text-text-muted whitespace-nowrap">{event.time}</div>
                          <div className="text-[10px] text-text-secondary mt-1">{event.actor}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
