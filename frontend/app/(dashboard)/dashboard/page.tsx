"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { 
  Sparkles, 
  Send, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Clock, 
  Terminal, 
  Flame, 
  Play, 
  Calendar,
  Layers,
  ChevronRight,
  BookOpen
} from "lucide-react";

// Context sources
const CONTEXT_ITEMS = [
  { type: "repo", name: "api-gateway", active: true },
  { type: "repo", name: "ml-pipeline", active: true },
  { type: "meeting", name: "Sprint 24 Planning", active: true },
  { type: "pr", name: "PR #247 — RAG Integration", active: true },
  { type: "sprint", name: "Sprint 24", active: true },
];

const SUGGESTED_PROMPTS = [
  { text: "Why did JWT authentication implementation change?", icon: "🔑" },
  { text: "What are the core delivery risks for Sprint 24?", icon: "📡" },
  { text: "Explain the main architectural design of the api-gateway.", icon: "🏗️" },
  { text: "Generate a summary of the RAG integration pull request.", icon: "📝" },
];

const MOCK_ANSWERS: Record<string, { text: string; sources: string[] }> = {
  auth: {
    text: `### JWT Authentication Changes (Nov 2025)

The authentication system was migrated from **HS256 (symmetric)** to **RS256 (asymmetric signing)** following security vulnerability report **CVE-2025-AUTH**:

1. **Why it changed**: The shared secret model for HS256 created high risk of token leakage in microservices log pools.
2. **What was implemented**:
   - RS256 signing using public/private key pairs.
   - Public keys are exposed via JWKS endpoints on the identity service.
   - Tokens now include a mandatory \`kid\` (Key ID) header for key rotation.
3. **Key files affected**:
   - [\`auth-service/middleware/jwt.go\`](file:///c:/Projects/EngineerMind%20AI/backend/app/api/v1/router.py)
   - [\`api-gateway/src/plugins/auth.ts\`](file:///c:/Projects/EngineerMind%20AI/frontend/app/layout.tsx)

*Verdict: Security posture resolved to Grade A.*`,
    sources: ["api-gateway · auth.ts", "auth-service · jwt.go", "ADR-012 — Asymmetric Auth"]
  },
  risk: {
    text: `### Sprint 24 Delivery Risks

Based on recent commit velocity and PR wait times, there is a **74% probability** of delivering all planned story points on schedule:

* 🔴 **Critical Path Bottleneck**: Alice Chen has 8 pending items on the **Qdrant Vector RAG integration**. This is the highest dependency file in this sprint.
* 🟡 **Dependency Risk**: Integration with the external sandbox API is currently blocked by credentials.
* 🟢 **Resource Buffer**: Bob Kumar and Sarah Williams have cleared their queues and are available to assist.

**Recommended Actions**:
1. Reassign stories **ENG-342** and **ENG-345** from Alice to Bob to clear the RAG blocker.
2. Run \`kubectl logs -n sandbox\` to debug external API connection issues.`,
    sources: ["Sprint 24 Board", "git · commits/active", "Meeting: Backend Standup (Dec 9)"]
  },
  arch: {
    text: `### api-gateway Architecture

The **api-gateway** service functions as the entry point for all client requests:

* **Engine**: Built with Fastify (TypeScript) for ultra-low latency overhead (<5ms).
* **Core Modules**:
  1. **Rate Limiting**: Redis-backed sliding window algorithm (capped at 100 req/min/IP).
  2. **Route Router**: Node-router proxying to downstream microservices (auth, pipeline, search).
  3. **Error Boundary**: Circuit breaker pattern implemented for downstream services with 1500ms timeout fallbacks.
* **Database**: None. Caches metadata using local Redis cluster.`,
    sources: ["api-gateway · src/index.ts", "Architecture Guide v2.0"]
  },
  summary: {
    text: `### PR #247 Analysis (Qdrant Vector Search RAG)

Alice Chen's RAG pipeline integration PR has been analyzed by the **CodeBERT model**:

* **Verdict**: ⚠ **Needs Review** (1 security issue, 2 performance recommendations).
* **Summary of Changes**:
  - Configures Qdrant client connection pool using async lifespan parameters.
  - Implements semantic chunking using the **BGE-large-en** embedding model.
  - Integrates query retrieval inside the main search API route.
* **Vulnerabilities**:
  - Line 84: API key logged in plaintext. Mask the logger immediately.`,
    sources: ["PR #247", "services/rag_service.py", "ml-pipeline · train_codebert.py"]
  },
  default: {
    text: `I'm analyzing your engineering database. Here are the core highlights across the repositories:
* **api-gateway** is performing cleanly with an active deployment v2.4.1.
* **PR #247 (RAG integration)** is the current focus of the engineering team.
* **Sprint 24** has 4 days remaining.

How can I help you investigate these files further?`,
    sources: ["System Catalog"]
  }
};

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello, Kunjal! I am **EngineerMind AI**.\n\nI have indexed all repositories, meeting transcripts, and sprint history. Ask me any question about your codebase, deployment statuses, or delivery risks.",
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentResponse]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI thinking and streaming
    await new Promise(resolve => setTimeout(resolve, 800));

    let responseData = MOCK_ANSWERS.default;
    const lower = text.toLowerCase();
    if (lower.includes("auth") || lower.includes("jwt") || lower.includes("security")) {
      responseData = MOCK_ANSWERS.auth;
    } else if (lower.includes("risk") || lower.includes("sprint") || lower.includes("bottleneck")) {
      responseData = MOCK_ANSWERS.risk;
    } else if (lower.includes("architecture") || lower.includes("explain") || lower.includes("gateway")) {
      responseData = MOCK_ANSWERS.arch;
    } else if (lower.includes("pr") || lower.includes("rag") || lower.includes("review")) {
      responseData = MOCK_ANSWERS.summary;
    }

    // Streaming effect
    setLoading(false);
    const words = responseData.text.split(" ");
    let typedText = "";
    
    for (let i = 0; i < words.length; i++) {
      typedText += (i === 0 ? "" : " ") + words[i];
      setCurrentResponse(typedText);
      await new Promise(resolve => setTimeout(resolve, 15));
    }

    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: responseData.text,
      sources: responseData.sources
    }]);
    setCurrentResponse("");
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0B0F14]">
      {/* LEFT & CENTER: Ask AI Workspace */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-[rgba(255,255,255,0.06)]">
        {/* Workspace Header */}
        <header className="h-14 border-b border-[rgba(255,255,255,0.06)] px-6 flex items-center justify-between bg-[#121826]/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue" />
            <span className="text-sm font-semibold text-slate-200">Ask AI Workspace</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-800/40 px-2.5 py-1 rounded-md border border-[rgba(255,255,255,0.04)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Model: CodeBERT + GPT-4o
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-blue/15 border border-blue/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-blue" />
                </div>
              )}
              <div className={`max-w-[80%] flex flex-col gap-1.5 ${msg.role === "user" ? "items-end" : ""}`}>
                <div className={`rounded-xl px-4 py-3.5 text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-blue text-white rounded-tr-sm" 
                    : "bg-[#121826] border border-[rgba(255,255,255,0.05)] text-slate-200 rounded-tl-sm"
                }`}>
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-slate-100 prose-headings:font-bold prose-headings:mt-2 prose-headings:mb-1 prose-strong:text-blue prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>

                {/* Citations / Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {msg.sources.map((src, i) => (
                      <div key={i} className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800/40 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.03)] font-mono">
                        <BookOpen className="w-2.5 h-2.5 text-blue/70" />
                        {src}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Current typing stream */}
          {currentResponse && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-blue/15 border border-blue/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-blue" />
              </div>
              <div className="max-w-[80%] bg-[#121826] border border-[rgba(255,255,255,0.05)] text-slate-200 rounded-xl rounded-tl-sm px-4 py-3.5 text-sm leading-relaxed">
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-slate-100 prose-headings:font-bold prose-headings:mt-2 prose-headings:mb-1 prose-strong:text-blue prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs">
                  <ReactMarkdown>{currentResponse}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Loading spinner */}
          {loading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-blue/15 border border-blue/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-blue animate-pulse" />
              </div>
              <div className="bg-[#121826] border border-[rgba(255,255,255,0.05)] text-slate-400 rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-xs">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries when conversation is fresh */}
        {messages.length === 1 && !loading && (
          <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.04)] bg-[#121826]/10">
            <p className="text-xs text-slate-500 font-semibold mb-3">Suggested queries:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt.text)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[#121826] text-left text-xs text-slate-300 hover:border-blue/30 hover:bg-[#1C2333] transition-all duration-200"
                >
                  <span className="text-sm">{prompt.icon}</span>
                  <span className="truncate flex-1">{prompt.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 hover:text-blue transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.06)] bg-[#121826]/30">
          <div className="flex items-end gap-3 p-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#121826] focus-within:border-blue/50 focus-within:ring-1 focus-within:ring-blue/50 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder="Ask anything about the codebase, sprint delay predictions, or action items..."
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none resize-none max-h-32"
              rows={1}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || loading}
              className="p-2 bg-blue text-white rounded-lg disabled:opacity-40 hover:bg-blue-hover transition-all duration-200 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Morning Brief */}
      <div className="w-[380px] hidden xl:flex flex-col bg-[#121826] flex-shrink-0 overflow-y-auto">
        <div className="p-5 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-200">Good evening, Kunjal 👋</h2>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">Fri, Dec 9 · Sprint 24</p>
          </div>
          <span className="px-2 py-0.5 bg-blue/15 text-blue rounded text-[10px] font-bold border border-blue/20">
            Platform Active
          </span>
        </div>

        <div className="p-5 space-y-6">
          {/* Primary Attention Action Card */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Needs Attention</div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">api-gateway PR #247</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Alice Chen's RAG integration has 1 critical security issue detected.</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pl-6.5 text-[10px] text-amber-400 font-mono">
                <span>Score: 87/100</span>
                <span>•</span>
                <span>Plaintext API key log</span>
              </div>
              <div className="flex gap-2 pl-6.5">
                <Link
                  href="/dashboard/code-review"
                  className="px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[10px] font-bold rounded transition-colors flex items-center gap-1"
                >
                  <Terminal className="w-3 h-3" />
                  Review PR Verdict
                </Link>
              </div>
            </div>
          </div>

          {/* Attention Items Feed */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Attention Log</div>
            <div className="space-y-2.5">
              {[
                { 
                  status: "success", 
                  title: "Prod Deployment Complete", 
                  desc: "v2.4.1 deployed to Kubernetes (api-gateway)",
                  time: "2h ago"
                },
                { 
                  status: "danger", 
                  title: "Sprint Velocity Warning", 
                  desc: "Sprint velocity dropped 8% — 3 items are flagged at risk.",
                  time: "5h ago"
                },
                { 
                  status: "info", 
                  title: "Pending Action Items", 
                  desc: "4 action items extraction completed from this morning's planning.",
                  time: "1d ago"
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg border border-[rgba(255,255,255,0.03)] bg-[#0B0F14]/40">
                  <div className="mt-0.5">
                    {item.status === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {item.status === "danger" && <Flame className="w-4 h-4 text-rose-500 animate-pulse" />}
                    {item.status === "info" && <Info className="w-4 h-4 text-blue" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-[11px] font-bold text-slate-200 truncate">{item.title}</h5>
                      <span className="text-[9px] text-slate-500 whitespace-nowrap font-mono">{item.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Activity Feed</div>
            <div className="relative border-l border-[rgba(255,255,255,0.06)] pl-4 ml-2 space-y-4">
              {[
                { actor: "alice-chen", action: "pushed code", target: "feature/qdrant-integration", time: "2h ago" },
                { actor: "bob-kumar", action: "merged PR #246", target: "fix/webhook-race-condition", time: "5h ago" },
                { actor: "sarah-williams", action: "completed code review", target: "auth-service", time: "1d ago" },
              ].map((event, i) => (
                <div key={i} className="relative text-[10px] text-slate-400 leading-relaxed">
                  <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#121826] border border-blue flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">{event.actor}</span>
                    <span> {event.action} to </span>
                    <span className="text-blue font-mono bg-blue/5 border border-blue/10 px-1 py-0.5 rounded text-[9px]">{event.target}</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5 font-mono">{event.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
