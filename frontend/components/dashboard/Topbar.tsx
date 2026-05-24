"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-14 flex-shrink-0 border-b border-border bg-surface/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-40">
      {/* Page title */}
      <div className="flex-shrink-0">
        <h1 className="font-heading text-sm font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className={`flex-1 max-w-md mx-auto relative transition-all duration-200 ${searchFocused ? "max-w-lg" : ""}`}>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${
          searchFocused ? "border-blue/40 bg-elevated shadow-[0_0_0_3px_rgba(47,107,255,0.08)]" : "border-border bg-elevated"
        }`}>
          <svg className="w-3.5 h-3.5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder='Ask anything... "Why was auth changed?"'
            className="flex-1 bg-transparent text-xs text-text-primary placeholder-text-muted outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="text-[10px] text-text-muted bg-surface border border-border px-1.5 py-0.5 rounded font-mono hidden sm:block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-elevated transition-colors group">
          <svg className="w-4 h-4 text-text-muted group-hover:text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        </button>

        {/* Deploy status */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl badge-success text-xs font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span>Pipeline Passing</span>
        </div>

        {/* Link to workspace */}
        <Link
          href="/dashboard/workspace"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl badge-blue text-xs font-medium hover:bg-blue/20 transition-colors"
        >
          <span>✦</span>
          <span>Ask AI</span>
        </Link>
      </div>
    </header>
  );
}
