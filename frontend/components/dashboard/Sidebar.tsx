"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "⬡", label: "Dashboard", badge: null },
  { href: "/dashboard/repositories", icon: "◈", label: "Repositories", badge: "5" },
  { href: "/dashboard/code-review", icon: "◉", label: "Code Review", badge: "3" },
  { href: "/dashboard/meetings", icon: "◎", label: "Meetings", badge: null },
  { href: "/dashboard/risk", icon: "◈", label: "Risk Radar", badge: null },
  { href: "/dashboard/knowledge", icon: "◉", label: "Knowledge", badge: null },
  { href: "/dashboard/timeline", icon: "◎", label: "Timeline", badge: null },
  { href: "/dashboard/workspace", icon: "✦", label: "AI Workspace", badge: "AI" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 h-screen sticky top-0 flex flex-col border-r border-border bg-surface/60 backdrop-blur-sm">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center shadow-accent-glow group-hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke="#0B0F14" strokeWidth="1.5"/>
              <circle cx="9" cy="9" r="2.5" fill="#0B0F14"/>
            </svg>
          </div>
          <div>
            <div className="font-heading text-sm font-bold text-text-primary tracking-tight leading-none">EngineerMind</div>
            <div className="text-[10px] text-accent font-medium tracking-wide">AI Platform</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] font-medium text-text-muted uppercase tracking-widest px-2 mb-3">Intelligence</div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative ${
                isActive
                  ? "bg-blue/10 text-text-primary border border-blue/20"
                  : "text-text-secondary hover:bg-elevated hover:text-text-primary"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-blue/8 rounded-xl border border-blue/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className={`text-base relative z-10 ${isActive ? "text-blue" : "text-text-muted group-hover:text-text-secondary"}`}>
                {item.icon}
              </span>
              <span className="flex-1 font-medium relative z-10 text-sm">{item.label}</span>
              {item.badge && (
                <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                  item.badge === "AI" ? "badge-accent" : "badge-blue"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Team status */}
      <div className="px-3 py-4 border-t border-border flex-shrink-0">
        <div className="card p-3 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-text-secondary font-medium">Sprint 24 Active</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">42 / 56 pts</span>
            <span className="text-success font-medium">75%</span>
          </div>
          <div className="mt-2 h-1 bg-elevated rounded-full overflow-hidden">
            <div className="h-full bg-success rounded-full" style={{ width: "75%" }} />
          </div>
          <div className="text-[10px] text-text-muted mt-1.5">4 days remaining</div>
        </div>
      </div>

      {/* User */}
      <div className="px-3 pb-4 flex-shrink-0">
        <button className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-elevated transition-colors group">
          <div className="w-7 h-7 rounded-full bg-blue/20 border border-blue/30 flex items-center justify-center text-xs font-bold text-blue">
            AC
          </div>
          <div className="flex-1 text-left">
            <div className="text-xs font-medium text-text-primary">Alice Chen</div>
            <div className="text-[10px] text-text-muted">Engineering Lead</div>
          </div>
          <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
