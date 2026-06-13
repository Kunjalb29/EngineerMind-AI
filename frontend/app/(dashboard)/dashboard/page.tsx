"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Send, 
  ArrowRight, 
  BookOpen, 
  GitPullRequest, 
  Video, 
  AlertTriangle,
  ArrowLeft
} from "lucide-react";

interface AIResponse {
  summary: string;
  evidence: string;
  prs: string[];
  meetings: string[];
  actions: string[];
  citations: string[];
}

const MOCK_ANSWERS: Record<string, AIResponse> = {
  auth: {
    summary: "The authentication system was migrated from symmetric HS256 to asymmetric RS256 signing following a security audit discovery of plaintext token key leaks in docker logging outputs.",
    evidence: "Public key verification is now processed dynamically against the JWKS endpoints registry key-sets.",
    prs: ["PR #231: refactor: Migrate JWT to RS256"],
    meetings: ["Security Architecture Review (Nov 14)"],
    actions: [
      "Mask credentials logging outputs inside auth plugins middleware.",
      "Sync public certificate rotation cache TTL limits."
    ],
    citations: ["ADR-012 — Asymmetric Key Verification Policy", "src/plugins/auth.ts : line 42"]
  },
  arch: {
    summary: "The api-gateway operates as a Fastify microservice proxy router proxying route paths to backend engines.",
    evidence: "Rate limits configurations utilize Redis sliding window counts capped at 100 req/min/IP.",
    prs: ["PR #224: feat: rate-limiting sliding Redis middleware"],
    meetings: ["Monolith Strangler Fig Strategy Review"],
    actions: [
      "Configure fallback routes limits on downstream timeouts.",
      "Check Istio sidecar proxy latency overhead metrics."
    ],
    citations: ["api-gateway · src/index.ts", "Architecture Guide v2.0"]
  },
  risk: {
    summary: "Moderate sprint delay risks predicted due to task congestion on the RAG pipeline integration.",
    evidence: "Alice Chen has 8 open backlog items. Pipeline predicts a 1.2-day delay on Sprint 24 goal target.",
    prs: ["PR #247: feat: vector search with Qdrant"],
    meetings: ["Sprint 24 Planning Standup"],
    actions: [
      "Reassign stories ENG-234 & ENG-235 from Alice to Bob Kumar.",
      "Request sandbox connection token credentials immediately."
    ],
    citations: ["XGBoost Risk Radar Registry", "Sprint 24 Planning Transcript"]
  },
  meeting: {
    summary: "The last backend standup concluded that the monolith migration facade strangler patterns will prioritize Auth candidate endpoints first.",
    evidence: "Postponed Redis caching pool refactoring changes to Sprint 25.",
    prs: ["PR #231: refactor: Migrate JWT to RS256"],
    meetings: ["Q4 Sprint Planning — Backend Team"],
    actions: [
      "Build basic Fastify routing skeletons.",
      "Configure docker-compose proxy services files."
    ],
    citations: ["Standup Transcripts Log (Dec 9)"]
  }
};

const DEFAULT_ANSWER: AIResponse = {
  summary: "I'm analyzing your engineering workspace. I have mapped 5 repositories, 2 meeting transcripts, and 3 open pull requests.",
  evidence: "Workspace context is fully loaded and indexed.",
  prs: ["PR #247: feat: vector search with Qdrant"],
  meetings: ["Q4 Sprint Planning — Backend Team"],
  actions: ["Use search or select suggestions to query specific features."],
  citations: ["System context registry"]
};

interface Message {
  role: "user" | "assistant";
  queryText?: string;
  response?: AIResponse;
}

export default function AIWorkspacePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    setMessages(prev => [...prev, { role: "user", queryText }]);
    setInput("");
    setLoading(true);

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1200));

    const lower = queryText.toLowerCase();
    let response = DEFAULT_ANSWER;

    if (lower.includes("auth") || lower.includes("jwt") || lower.includes("why")) {
      response = MOCK_ANSWERS.auth;
    } else if (lower.includes("arch") || lower.includes("gateway") || lower.includes("explain")) {
      response = MOCK_ANSWERS.arch;
    } else if (lower.includes("risk") || lower.includes("sprint") || lower.includes("delay")) {
      response = MOCK_ANSWERS.risk;
    } else if (lower.includes("meeting") || lower.includes("summarize") || lower.includes("last")) {
      response = MOCK_ANSWERS.meeting;
    }

    setMessages(prev => [...prev, { role: "assistant", response }]);
    setLoading(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleQuery(suggestion);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0B1220] overflow-hidden">
      
      {/* Messages Stream frame */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="content-container w-full space-y-8 max-w-3xl mx-auto">
          
          {/* Empty State: Center Aligned Entry Layout */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#F8FAFC]">
                  Good Evening Kunjal 👋
                </h1>
                <p className="text-sm text-[#94A3B8]">
                  What would you like to understand today?
                </p>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-2xl pt-4">
                {[
                  { text: "Explain architecture of api-gateway", icon: "🏗️" },
                  { text: "Show sprint risks for Sprint 24", icon: "📡" },
                  { text: "Summarize last standup meeting decisions", icon: "🎙️" },
                  { text: "Review latest pull request vulnerabilities", icon: "🔒" }
                ].map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(sugg.text)}
                    className="p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] text-left text-xs font-semibold text-slate-300 hover:border-[#2563EB]/40 hover:bg-[#111827]/85 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <span>{sugg.icon} {sugg.text}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Active Chat Conversation Bubble list */}
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4.5 h-4.5 text-[#2563EB]" />
                </div>
              )}

              <div className="max-w-[85%] space-y-2">
                {msg.role === "user" ? (
                  <div className="rounded-xl px-4 py-3 bg-[#2563EB] text-white text-sm font-semibold shadow-md rounded-tr-sm">
                    {msg.queryText}
                  </div>
                ) : (
                  msg.response && (
                    <div className="p-6 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl rounded-tl-sm space-y-4 shadow-xl">
                      
                      {/* 1. Summary */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">Summary</span>
                        <p className="text-sm text-[#F8FAFC] leading-relaxed font-sans">{msg.response.summary}</p>
                      </div>

                      {/* 2. Evidence */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block">Evidence</span>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">{msg.response.evidence}</p>
                      </div>

                      {/* 3. Related PRs */}
                      {msg.response.prs.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block">Related PRs</span>
                          <div className="space-y-1">
                            {msg.response.prs.map((pr, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-xs text-[#2563EB] font-bold">
                                <GitPullRequest className="w-3.5 h-3.5" />
                                <span>{pr}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 4. Related Meetings */}
                      {msg.response.meetings.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block">Related Meetings</span>
                          <div className="space-y-1">
                            {msg.response.meetings.map((meet, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-xs text-[#10B981] font-bold">
                                <Video className="w-3.5 h-3.5" />
                                <span>{meet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 5. Recommended Actions */}
                      {msg.response.actions.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block">Recommended Actions</span>
                          <div className="space-y-1.5">
                            {msg.response.actions.map((act, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                                <span className="font-semibold">{act}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 6. Citations */}
                      {msg.response.citations.length > 0 && (
                        <div className="border-t border-[rgba(255,255,255,0.06)] pt-3.5 flex flex-wrap gap-1.5">
                          {msg.response.citations.map((cit, i) => (
                            <div key={i} className="flex items-center gap-1 text-[10px] text-[#94A3B8] bg-[#0B1220] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.04)] font-mono">
                              <BookOpen className="w-3 h-3 text-[#2563EB]" />
                              {cit}
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  )
                )}
              </div>
            </motion.div>
          ))}

          {/* Loading bubble */}
          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4.5 h-4.5 text-[#2563EB] animate-pulse" />
              </div>
              <div className="p-4 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl rounded-tl-sm text-xs text-[#94A3B8] flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                Searching codebase vectors...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Centered Large Chat Input Bar at Bottom */}
      <div className="p-5 border-t border-[rgba(255,255,255,0.08)] bg-[#111827]/30 flex-shrink-0">
        <div className="content-container max-w-3xl mx-auto w-full">
          <div className="flex items-end gap-3 p-3 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl focus-within:border-[#2563EB]/50 focus-within:ring-1 focus-within:ring-[#2563EB]/50 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleQuery(input);
                }
              }}
              placeholder="Ask anything about authentication, code changes, or standup updates..."
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none resize-none max-h-32"
              rows={1}
            />
            <button
              onClick={() => handleQuery(input)}
              disabled={!input.trim() || loading}
              className="p-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg disabled:opacity-40 transition-colors flex-shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
