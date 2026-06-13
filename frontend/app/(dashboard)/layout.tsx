"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Folder, 
  Video, 
  GitPullRequest, 
  AlertTriangle, 
  Settings, 
  Search, 
  X,
  FileText,
  Clock,
  Check
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "AI Workspace", href: "/dashboard", icon: Sparkles },
  { label: "Repositories", href: "/dashboard/repositories", icon: Folder },
  { label: "Meetings", href: "/dashboard/meetings", icon: Video },
  { label: "Reviews", href: "/dashboard/code-review", icon: GitPullRequest },
  { label: "Risks", href: "/dashboard/risk", icon: AlertTriangle },
];

// Mock search entries database
const SEARCH_DATABASE = [
  { type: "File", title: "src/plugins/auth.ts", excerpt: "JWKS lookup configurations for token signing verification", score: "94%" },
  { type: "File", title: "middleware/jwt.go", excerpt: "asymmetric key signing validation rules and keys rotation policy", score: "92%" },
  { type: "Meeting", title: "Security Architecture Review (Nov 14)", excerpt: "Decision: Migrate verification keys symmetric HS256 to asymmetric RS256", score: "96%" },
  { type: "PR", title: "#231: refactor: Migrate JWT to RS256 tokens", excerpt: "Resolves credentials log vulnerability audit", score: "92%" },
  { type: "Commit", title: "refactor(auth): implement key rotating verify validation", excerpt: "Commit by alice-chen adding JWKS cache store", score: "88%" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [onboarded, setOnboarded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Enforce Onboarding Check
  useEffect(() => {
    const isCompleted = localStorage.getItem("onboarded") === "true";
    if (!isCompleted) {
      router.replace("/onboarding");
    } else {
      setOnboarded(true);
    }
  }, [router]);

  // Handle Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredSearch = SEARCH_DATABASE.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If not onboarded yet, show empty blank layout wrapper during replace redirect
  if (!onboarded) {
    return <div className="min-h-screen bg-[#0B1220]" />;
  }

  return (
    <div className="flex h-screen bg-[#0B1220] overflow-hidden font-sans text-[#F8FAFC]">
      
      {/* 1. Minimal Sidebar Layout (Only 6 Items) */}
      <aside className="w-56 bg-[#111827] border-r border-[rgba(255,255,255,0.08)] flex flex-col justify-between p-4 flex-shrink-0 z-30">
        <div className="space-y-6">
          {/* Brand branding header */}
          <div className="flex items-center gap-2 px-2 py-2.5">
            <div className="w-6 h-6 rounded bg-[#2563EB] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-white">EngineerMind</span>
          </div>

          {/* Core Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/dashboard" 
                ? pathname === "/dashboard" 
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? "bg-[#2563EB] text-white shadow-[0_0_12px_rgba(37,99,235,0.15)]" 
                      : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0B1220]/50"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 6th item: Settings at the bottom */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-4">
          <Link
            href="/dashboard"
            onClick={(e) => {
              e.preventDefault();
              alert("Settings panel coming soon!");
            }}
            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0B1220]/50 rounded-lg transition-all"
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* 2. Main content view area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Header containing top-center search bar */}
        <header className="h-14 border-b border-[rgba(255,255,255,0.08)] bg-[#111827]/40 px-6 flex items-center justify-between z-20">
          <div className="flex-1" />
          
          {/* Top-Center Search Input */}
          <div className="w-full max-w-sm flex justify-center">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#111827] text-left text-xs text-[#94A3B8] hover:border-[#2563EB]/40 hover:text-slate-300 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Search authentication...</span>
              </div>
              <span className="text-[10px] bg-[#0B1220] border border-[rgba(255,255,255,0.06)] px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </span>
            </button>
          </div>
          
          <div className="flex-1 flex justify-end" />
        </header>

        {/* Dashboard Pages Content Frame */}
        <div className="flex-1 overflow-hidden">
          <div className="w-full h-full max-layout-width">
            {children}
          </div>
        </div>

      </div>

      {/* 3. CMD+K Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-xl bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Search Bar Input inside modal */}
              <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-3">
                <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search Files, Meetings, PRs, or Commits..."
                  className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-1 hover:bg-[#0B1220] rounded-md transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Grouped results view list */}
              <div className="max-h-[350px] overflow-y-auto p-3 space-y-1.5">
                {filteredSearch.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#94A3B8] font-mono">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  filteredSearch.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        router.push("/dashboard"); // Take to AI Workspace home
                      }}
                      className="w-full text-left p-3 rounded-lg border border-[rgba(255,255,255,0.03)] bg-[#0B1220]/40 hover:bg-[#2563EB]/10 hover:border-[#2563EB]/25 transition-all flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 px-1.5 py-0.5 bg-slate-800 text-[#94A3B8] border border-[rgba(255,255,255,0.04)] rounded text-[9px] font-mono uppercase tracking-wider font-bold">
                          {item.type}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                          <p className="text-[10px] text-[#94A3B8] leading-relaxed mt-0.5">{item.excerpt}</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-[#10B981] font-mono">{item.score} match</span>
                    </button>
                  ))
                )}
              </div>

              <div className="p-3 border-t border-[rgba(255,255,255,0.08)] bg-[#0B1220]/40 text-[10px] text-slate-500 font-mono text-center">
                Press Esc or click close button to dismiss.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
