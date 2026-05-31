"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  HelpCircle,
  FileText,
  Video,
  GitPullRequest
} from "lucide-react";

const SUGGESTED_QUERIES = [
  "Why was authentication changed to RS256 last month?",
  "What is the deployment configuration process for api-gateway?",
  "Who owns the Qdrant RAG pipeline integration?",
  "What was decided about the caching strategy for Sprint 25?",
];

const MOCK_AI_RESPONSE = `### Authentication Migration Details

Based on your repositories, meeting transcripts, and architectural decision records (ADRs), here is the context on why authentication was migrated:

1. **The Vulnerability (CVE-2025-AUTH)**: The legacy system used symmetric **HS256** signatures. A security audit discovered that the shared key was exposed in backend microservices logging pools, presenting a severe credential leakage path.
2. **The Refactor (ADR-012)**: The backend team resolved this by migrating to asymmetric **RS256** signatures:
   - **Verification**: The gateway now checks tokens using public keys retrieved dynamically from the JWKS registry.
   - **Rotation**: Certificates are rotated automatically every 24 hours.
3. **Key Components**:
   - Verification logic resides in [\`api-gateway/src/plugins/auth.ts\`](file:///c:/Projects/EngineerMind%20AI/frontend/app/layout.tsx).
   - Core key generation is managed by the Auth microservice in [\`auth-service/middleware/jwt.go\`](file:///c:/Projects/EngineerMind%20AI/backend/app/api/v1/router.py).`;

const MOCK_CITATIONS = [
  { type: "meeting", title: "Security Architecture Review (Nov 14)", score: 0.96 },
  { type: "pr", title: "PR #231: refactor: Migrate JWT to RS256 keys", score: 0.92 },
  { type: "doc", title: "Architecture Decision Record (ADR-012)", score: 0.88 },
];

export default function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showCitations, setShowCitations] = useState(true);
  const [aiAnswer, setAiAnswer] = useState("");

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setSearched(true);
    setAiAnswer("");
    
    // Simulate AI retrieval
    setTimeout(() => {
      setLoading(false);
      setAiAnswer(MOCK_AI_RESPONSE);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0B0F14] overflow-hidden">
      
      {/* Header */}
      <header className="h-14 border-b border-[rgba(255,255,255,0.06)] px-6 flex items-center justify-between bg-[#121826]/40 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-blue" />
          <span className="text-sm font-semibold text-slate-200">Knowledge Search</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-800/40 px-2.5 py-1 rounded-md border border-[rgba(255,255,255,0.04)]">
          <Cpu className="w-3.5 h-3.5 text-slate-500" />
          Index: Qdrant Vector DB
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-8">
          
          {/* Centered intro on initial state */}
          {!searched && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2.5"
            >
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Understand your engineering history.
              </h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                RAG-powered semantic search across connected repositories, transcripts, ADRs, and issues.
              </p>
            </motion.div>
          )}

          {/* Search Input Bar */}
          <div className="p-3 bg-[#121826] border border-[rgba(255,255,255,0.08)] rounded-xl focus-within:border-blue/50 focus-within:ring-1 focus-within:ring-blue/50 transition-all flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-500 ml-1.5 flex-shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch(query)}
              placeholder="Ask anything about your codebase, ADR decisions, or PR reviews..."
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
            />
            <button
              onClick={() => handleSearch(query)}
              disabled={!query.trim() || loading}
              className="p-2 bg-blue hover:bg-blue-hover text-white rounded-lg disabled:opacity-40 transition-colors flex-shrink-0"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Suggested Queries */}
          {!searched && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-2.5"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-center">Suggested Queries</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {SUGGESTED_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(q)}
                    className="p-3 rounded-lg border border-[rgba(255,255,255,0.04)] bg-[#121826]/40 hover:bg-[#121826] text-xs text-slate-300 text-left transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results Display */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 pt-4"
              >
                <div className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-2 font-mono">
                  <div className="w-3.5 h-3.5 border-2 border-blue border-t-transparent rounded-full animate-spin" />
                  Running BGE-Large semantic indexing across files...
                </div>
                <div className="space-y-3">
                  <div className="h-16 w-full bg-[#121826]/50 rounded-xl animate-pulse" />
                  <div className="h-28 w-full bg-[#121826]/50 rounded-xl animate-pulse" />
                </div>
              </motion.div>
            )}

            {!loading && searched && aiAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-2"
              >
                {/* AI Structured Answer */}
                <div className="p-5 bg-[#121826] border border-[rgba(255,255,255,0.05)] rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.04)] pb-3">
                    <Sparkles className="w-4 h-4 text-blue" />
                    <span className="text-xs font-bold text-slate-200">AI Answer Engine</span>
                  </div>
                  
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-slate-100 prose-headings:font-bold prose-headings:mt-2 prose-headings:mb-1 prose-strong:text-blue prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs leading-relaxed text-slate-300">
                    <ReactMarkdown>{aiAnswer}</ReactMarkdown>
                  </div>
                </div>

                {/* Citations Panel */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => setShowCitations(!showCitations)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>Citations & Sources</span>
                    {showCitations ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <AnimatePresence>
                    {showCitations && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-2 overflow-hidden"
                      >
                        {MOCK_CITATIONS.map((cit, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-[#121826] border border-[rgba(255,255,255,0.04)] rounded-lg space-y-2 flex flex-col justify-between"
                          >
                            <div className="flex items-center gap-1.5">
                              {cit.type === "meeting" && <Video className="w-3.5 h-3.5 text-emerald-400" />}
                              {cit.type === "pr" && <GitPullRequest className="w-3.5 h-3.5 text-blue" />}
                              {cit.type === "doc" && <FileText className="w-3.5 h-3.5 text-purple-400" />}
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">{cit.type}</span>
                            </div>
                            <h4 className="text-[11px] font-bold text-slate-200 leading-snug line-clamp-2">
                              {cit.title}
                            </h4>
                            <span className="text-[9px] text-emerald-400 font-mono self-end">
                              {Math.round(cit.score * 100)}% Match
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

    </div>
  );
}
