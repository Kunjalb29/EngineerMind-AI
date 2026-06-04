"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Folder, 
  GitPullRequest, 
  Video, 
  AlertTriangle, 
  Search, 
  Settings,
  HelpCircle,
  User
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Sparkles, label: "Ask AI & Brief", id: "home" },
  { href: "/dashboard/repositories", icon: Folder, label: "Repository Stories", id: "repos" },
  { href: "/dashboard/code-review", icon: GitPullRequest, label: "PR Inbox", id: "review" },
  { href: "/dashboard/meetings", icon: Video, label: "Decision Log", id: "meetings" },
  { href: "/dashboard/risk", icon: AlertTriangle, label: "Risk Signals", id: "risk" },
  { href: "/dashboard/knowledge", icon: Search, label: "Search Knowledge", id: "knowledge" },
];

export default function IconRail() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="w-16 h-screen sticky top-0 flex flex-col justify-between items-center py-4 border-r border-[rgba(255,255,255,0.06)] bg-[#121826] flex-shrink-0 z-40">
      {/* Top Branding / Logo */}
      <div className="flex flex-col items-center gap-6 w-full">
        <Link href="/" className="group flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-blue flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.25)] group-hover:shadow-[0_0_25px_rgba(37,99,235,0.45)] group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke="#0B0F14" strokeWidth="1.5" fill="#0B0F14"/>
              <path d="M9 2L16 6V12L9 16" stroke="white" strokeWidth="1.2" opacity="0.8"/>
              <circle cx="9" cy="9" r="2" fill="white"/>
            </svg>
          </div>
        </Link>

        <div className="w-8 h-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 w-full px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            // Exact match for dashboard home, startsWith for others
            const isActive = item.href === "/dashboard" 
              ? pathname === "/dashboard" 
              : pathname.startsWith(item.href);

            return (
              <div
                key={item.href}
                className="relative flex justify-center w-full"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isActive 
                      ? "bg-blue text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className="w-5 h-5 relative z-10" />

                  {/* Active dot/line indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-1 h-6 bg-blue rounded-r-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Tooltip */}
                {hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-900 border border-[rgba(255,255,255,0.1)] text-slate-100 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50 pointer-events-none"
                  >
                    {item.label}
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile / Settings */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        <div className="w-8 h-[1px] bg-[rgba(255,255,255,0.06)] mb-2" />

        {/* Help icon */}
        <div
          className="relative flex justify-center w-full"
          onMouseEnter={() => setHoveredItem("help")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          {hoveredItem === "help" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-900 border border-[rgba(255,255,255,0.1)] text-slate-100 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50 pointer-events-none"
            >
              Documentation
            </motion.div>
          )}
        </div>

        {/* Settings icon */}
        <div
          className="relative flex justify-center w-full"
          onMouseEnter={() => setHoveredItem("settings")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          {hoveredItem === "settings" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-900 border border-[rgba(255,255,255,0.1)] text-slate-100 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50 pointer-events-none"
            >
              Settings
            </motion.div>
          )}
        </div>

        {/* User avatar */}
        <div
          className="relative flex justify-center w-full mt-2"
          onMouseEnter={() => setHoveredItem("profile")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <button className="w-9 h-9 rounded-full bg-blue/20 border border-blue/30 text-blue font-bold text-xs flex items-center justify-center hover:bg-blue/30 transition-colors">
            KC
          </button>
          {hoveredItem === "profile" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-900 border border-[rgba(255,255,255,0.1)] text-slate-100 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50 pointer-events-none"
            >
              Kunjal Bhatia
            </motion.div>
          )}
        </div>
      </div>
    </aside>
  );
}
