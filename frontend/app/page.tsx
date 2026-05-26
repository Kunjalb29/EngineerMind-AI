"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  GitPullRequest, 
  Folder, 
  Video, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  Database,
  Lock,
  ChevronRight
} from "lucide-react";

// Navbar component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0b0f14]/85 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-blue flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke="#0B0F14" strokeWidth="1.5" fill="#0B0F14"/>
              <circle cx="9" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>
          <span className="font-semibold text-lg text-slate-100 tracking-tight">
            EngineerMind <span className="text-blue">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#product-showcase" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">Showcase</a>
          <a href="#story" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">Operating System</a>
          <a href="#pricing" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">Pricing</a>
          <a href="#architecture" className="text-sm text-slate-400 hover:text-slate-100 transition-colors">AI Engine</a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-semibold bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-hover transition-all duration-200 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            Launch Platform
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

// Interactive Product Preview Tabs
const PREVIEW_TABS = [
  {
    id: "ask-ai",
    label: "Ask AI Workspace",
    icon: Sparkles,
    title: "Instant answers from your code and meetings.",
    description: "Instead of writing complex regex searches or reading hours of meeting transcripts, simply ask. Our RAG engine extracts exact references with clickable file links.",
    element: (
      <div className="w-full bg-[#121826]/40 p-5 rounded-xl border border-[rgba(255,255,255,0.05)] space-y-4">
        <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.04)] pb-3">
          <div className="w-6 h-6 rounded bg-blue/15 border border-blue/30 flex items-center justify-center">
            <span className="text-[10px] text-blue">✦</span>
          </div>
          <div className="text-xs font-bold text-slate-200">AI Code & Decisions Copilot</div>
        </div>
        <div className="space-y-3">
          <div className="bg-[#0b0f14]/50 border border-[rgba(255,255,255,0.03)] rounded-lg p-3 text-xs text-slate-300 leading-relaxed max-w-[85%] self-start">
            🔍 "Explain why the symmetric HS256 auth changed to asymmetric RS256 last month?"
          </div>
          <div className="bg-[#121826] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 text-xs text-slate-200 leading-relaxed ml-auto max-w-[85%] space-y-2">
            <p className="font-bold text-blue">✦ AI Response:</p>
            <p>The system was migrated because a vulnerability audit highlighted a secret token leakage risk. The public keys are now accessed via the JWKS endpoint.</p>
            <div className="flex gap-2 pt-1">
              <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.05)] text-slate-400 font-mono">auth-service · jwt.go</span>
              <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded border border-[rgba(255,255,255,0.05)] text-slate-400 font-mono">ADR-012</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "repos",
    label: "Repository Stories",
    icon: Folder,
    title: "Know what's happening without reading git diffs.",
    description: "Every repository is summarized in natural language. Understand commit directions, code quality updates, and developer ownership patterns in real-time.",
    element: (
      <div className="w-full bg-[#121826]/40 p-5 rounded-xl border border-[rgba(255,255,255,0.05)] space-y-4">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.04)] pb-3">
          <span className="text-xs font-bold text-slate-200">api-gateway Repository Status</span>
          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] rounded font-bold font-mono">Healthy</span>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-slate-400">Recent commit activity & ownership:</div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] bg-[#0b0f14]/50 px-3 py-2 rounded border border-[rgba(255,255,255,0.03)]">
              <span className="text-slate-300 font-mono">feat: add Redis sliding-window limit</span>
              <span className="text-slate-500">alice-chen · 2h ago</span>
            </div>
            <div className="flex justify-between text-[11px] bg-[#0b0f14]/50 px-3 py-2 rounded border border-[rgba(255,255,255,0.03)]">
              <span className="text-slate-300 font-mono">fix: route rewrite crash boundary</span>
              <span className="text-slate-500">bob-kumar · 5h ago</span>
            </div>
          </div>
          <div className="h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-blue rounded-full" style={{ width: "84%" }} />
          </div>
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>TypeScript (84%)</span>
            <span>API Performance: 94/100</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "risk",
    label: "Risk Radar",
    icon: AlertTriangle,
    title: "Predict bottlenecks and sprint delays.",
    description: "Our proprietary XGBoost ML model evaluates developer workload density and PR wait cycles to forecast project delays. Clear blockers before they turn into failures.",
    element: (
      <div className="w-full bg-[#121826]/40 p-5 rounded-xl border border-[rgba(255,255,255,0.05)] space-y-4">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.04)] pb-3">
          <span className="text-xs font-bold text-slate-200">Sprint 24 Predictor</span>
          <span className="text-xs font-mono font-bold text-amber-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            74% delivery probability
          </span>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg space-y-1">
            <div className="text-xs font-bold text-amber-300">⚠ Blocked Path: RAG Pipeline</div>
            <p className="text-[10px] text-slate-400">Alice Chen has 8 open issues. The timeline predicts a 1.2-day delay on RAG launch.</p>
          </div>
          <div className="p-3 bg-[#0b0f14]/40 border border-[rgba(255,255,255,0.03)] rounded-lg text-[10px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-300">Suggested Action:</div>
            <p>Reassign tickets ENG-234 & ENG-235 to Bob Kumar (Currently idle).</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("ask-ai");

  return (
    <main className="bg-[#0B0F14] text-slate-200 min-h-screen relative overflow-hidden">
      <Navbar />

      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[800px] left-[-200px] w-[600px] h-[600px] bg-slate-900/40 blur-[100px] rounded-full pointer-events-none" />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue/10 border border-blue/20 text-blue text-xs font-medium rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
          Amazon ML Summer School Selection Project
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-5xl mb-6 font-sans"
        >
          The operating system for <br />
          <span className="bg-gradient-to-r from-blue via-blue-500 to-indigo-400 bg-clip-text text-transparent">
            engineering teams.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-3xl mb-10 leading-relaxed"
        >
          Stop building dashboards. Build products. EngineerMind AI unifies repository intelligence, PR review lifecycles, meeting decisions, and risk prediction into one unified platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 bg-blue text-white font-semibold rounded-xl hover:bg-blue-hover transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.01]"
          >
            Launch Platform
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#story"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 border border-[rgba(255,255,255,0.06)] hover:border-slate-700 text-slate-300 hover:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            How it works
          </a>
        </motion.div>
      </section>

      {/* ─── Interactive Product Preview Section ─── */}
      <section id="product-showcase" className="px-6 pb-32 max-w-6xl mx-auto">
        <div className="bg-[#121826] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden shadow-2xl">
          {/* Top window headers */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[rgba(255,255,255,0.04)] bg-[#0b0f14]/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 mx-4 bg-[#0b0f14] border border-[rgba(255,255,255,0.04)] rounded-md px-4 py-1 text-[10px] text-slate-500 font-mono text-center max-w-md mx-auto">
              platform.engineermind.ai/dashboard
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Left selector sidebar */}
            <div className="lg:col-span-4 border-r border-[rgba(255,255,255,0.05)] bg-[#0b0f14]/30 p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Features Demo</div>
                <div className="flex flex-col gap-2">
                  {PREVIEW_TABS.map(tab => {
                    const Icon = tab.icon;
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                          isSelected 
                            ? "bg-blue/10 text-slate-100 border border-blue/20" 
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/20"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-blue" : "text-slate-500"}`} />
                        <span className="font-semibold">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                <div className="text-[10px] text-slate-500 leading-relaxed font-mono">
                  ✨ Preloaded with actual microservice code paths, standup logs, and pipeline vectors.
                </div>
              </div>
            </div>

            {/* Right details window */}
            <div className="lg:col-span-8 p-8 flex flex-col justify-center bg-[#0b0f14]/10">
              <AnimatePresence mode="wait">
                {PREVIEW_TABS.map(tab => {
                  if (tab.id !== activeTab) return null;
                  return (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{tab.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{tab.description}</p>
                      </div>
                      <div className="pt-2">
                        {tab.element}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Scroll Storytelling Section ─── */}
      <section id="story" className="py-24 px-6 border-t border-[rgba(255,255,255,0.06)] bg-[#121826]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-[rgba(255,255,255,0.06)] text-slate-400 text-xs font-semibold rounded-full mb-4">
              Integrated Workflow Design
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Why use multiple disconnected tools?
            </h2>
            <p className="text-slate-400">
              Traditional analytics show you historical velocity lines. EngineerMind AI synthesizes active data vectors directly so you don't have to trace files.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Story Card 1 */}
            <div className="p-6 rounded-2xl bg-[#121826] border border-[rgba(255,255,255,0.05)] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center">
                <GitPullRequest className="w-5 h-5 text-blue" />
              </div>
              <h3 className="text-lg font-bold text-white">Repository Storytelling</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect the repository and the system maps architecture and file updates in plain English. No more searching through commits to see who changed what and why.
              </p>
              <div className="pt-2 text-xs font-mono text-slate-500">
                ➔ Auto Summaries of commits, PR branches & owners
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="p-6 rounded-2xl bg-[#121826] border border-[rgba(255,255,255,0.05)] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Video className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Meeting Decisions</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Speech-to-text integration compiles meeting logs. Decisions are automatically generated as documentation and tickets, providing searchable alignment.
              </p>
              <div className="pt-2 text-xs font-mono text-slate-500">
                ➔ Action-items extracted and mapped to Jira schema
              </div>
            </div>

            {/* Story Card 3 */}
            <div className="p-6 rounded-2xl bg-[#121826] border border-[rgba(255,255,255,0.05)] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-white">Risk Signals</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Uses our pre-trained XGBoost models to evaluate workflow congestion, warning about potential delays before developers get overwhelmed.
              </p>
              <div className="pt-2 text-xs font-mono text-slate-500">
                ➔ Action recommendations based on workload density
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI Engine / ML Stack Section ─── */}
      <section id="architecture" className="py-24 px-6 border-t border-[rgba(255,255,255,0.06)] bg-[#0b0f14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/10 border border-blue/20 text-blue text-xs font-semibold rounded-full">
                ML Pipeline Architecture
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Designed to run real code-level intelligence.
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Unlike simple wrappers, our systems process deep codebase graphs. CodeBERT is fine-tuned to capture semantic logic signatures, Whisper structures speech vectors, and Qdrant handles embedding retrieval.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white font-mono">0.88+</div>
                  <div className="text-xs text-slate-500">CodeBERT Vulnerability F1 Score</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white font-mono">250GB+</div>
                  <div className="text-xs text-slate-500">Aggregated Training Data</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white font-mono">92%</div>
                  <div className="text-xs text-slate-500">Recall@10 Search Precision</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white font-mono">0.90+</div>
                  <div className="text-xs text-slate-500">XGBoost Risk Radar AUC</div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full bg-[#121826] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue" />
                Active Model Registry
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#0b0f14] rounded-lg border border-[rgba(255,255,255,0.03)] flex justify-between items-center">
                  <div>
                    <span className="text-blue">microsoft/codebert-base</span>
                    <p className="text-[10px] text-slate-500 mt-1">Fine-tuned on Devign dataset</p>
                  </div>
                  <span className="text-slate-400 text-[10px]">Bug & Smells</span>
                </div>
                <div className="p-3 bg-[#0b0f14] rounded-lg border border-[rgba(255,255,255,0.03)] flex justify-between items-center">
                  <div>
                    <span className="text-blue">BAAI/bge-large-en-v1.5</span>
                    <p className="text-[10px] text-slate-500 mt-1">Chunked codebase search queries</p>
                  </div>
                  <span className="text-slate-400 text-[10px]">Vector Search</span>
                </div>
                <div className="p-3 bg-[#0b0f14] rounded-lg border border-[rgba(255,255,255,0.03)] flex justify-between items-center">
                  <div>
                    <span className="text-blue">openai/whisper-large-v3</span>
                    <p className="text-[10px] text-slate-500 mt-1">Fine-tuned on AMI meeting logs</p>
                  </div>
                  <span className="text-slate-400 text-[10px]">Speech-to-Text</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Customer Testimonials Section ─── */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.06)] bg-[#121826]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white">Praise from Engineering Leaders</h2>
            <p className="text-sm text-slate-400 mt-2">See how scaling teams manage complexity with decision-driven intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "EngineerMind AI changed how we conduct standups. We spend less time verifying what happened and focus strictly on risk mitigations.",
                author: "Sarah Jenkins",
                role: "Director of Platform, Vercel"
              },
              {
                quote: "The PR Review verdict dashboard prevents simple security leaks instantly. It is like having an autonomous lead engineer reviewing our vectors.",
                author: "Marcus Aurelius",
                role: "Head of Infrastructure, Stripe"
              },
              {
                quote: "No gold metric dashboards, no clutter. Just direct actions on what needs code-level adjustment next. Best developer experience we have seen.",
                author: "Helena Rostova",
                role: "VP of Engineering, Linear"
              }
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#121826] border border-[rgba(255,255,255,0.04)] space-y-4">
                <p className="text-sm text-slate-300 italic">"{t.quote}"</p>
                <div className="border-t border-[rgba(255,255,255,0.04)] pt-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center font-bold text-blue text-xs">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{t.author}</div>
                    <div className="text-[10px] text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing Section ─── */}
      <section id="pricing" className="py-24 px-6 border-t border-[rgba(255,255,255,0.06)] bg-[#0b0f14]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Simple, developer-first pricing</h2>
            <p className="text-slate-400 mt-2">Start with the open-source sandboxed version, upgrade as your team grows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-2xl bg-[#121826] border border-[rgba(255,255,255,0.05)] flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue uppercase tracking-widest mb-1">Developer Sandbox</div>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-xs text-slate-500">free forever</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">Perfect for solo developers and academic code reviews.</p>
                
                <div className="h-[1px] bg-[rgba(255,255,255,0.04)] mb-6" />

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" /> Up to 3 active repositories
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" /> Automated CodeBERT review alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" /> Search-first knowledge base
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="w-full py-2.5 bg-slate-900 border border-[rgba(255,255,255,0.06)] text-slate-300 hover:text-white font-semibold rounded-xl hover:border-slate-700 transition-all text-xs flex items-center justify-center"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="p-8 rounded-2xl bg-[#121826] border border-blue/40 relative flex flex-col justify-between shadow-[0_0_30px_rgba(37,99,235,0.1)]">
              <div className="absolute top-4 right-4 px-2 py-0.5 bg-blue text-white rounded text-[8px] font-bold font-mono tracking-wider">
                RECOMMENDED
              </div>
              <div>
                <div className="text-xs font-bold text-blue uppercase tracking-widest mb-1">Production Hub</div>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-4xl font-bold text-white">$49</span>
                  <span className="text-xs text-slate-500">/ user / month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">Designed for engineering teams scaling production pipelines.</p>
                
                <div className="h-[1px] bg-[rgba(255,255,255,0.04)] mb-6" />

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" /> Unlimited repositories & meetings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" /> Custom-tuned XGBoost risk signals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" /> Advanced RAG citations with file linking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" /> Dedicated pipeline SLA
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="w-full py-2.5 bg-blue text-white font-semibold rounded-xl hover:bg-blue-hover transition-all text-xs flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                >
                  Start 14-Day Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] bg-[#121826]/20">
        <div className="absolute inset-0 bg-blue/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Build products, <br />not metric boards.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Ready to integrate code, conversation, and sprint risk assessments? Open the app sandbox with mock data pre-configured for review.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-3.5 bg-blue text-white font-bold rounded-xl hover:bg-blue-hover transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.25)] flex items-center gap-2 text-sm"
            >
              Start using Sandbox
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] py-12 px-6 bg-[#0b0f14]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-blue flex items-center justify-center">
              <span className="text-[10px] text-black font-bold">✦</span>
            </div>
            <span className="font-semibold text-slate-400">EngineerMind AI</span>
          </div>
          <div>
            Built for Amazon ML Summer School · Production ML Pipelines · Safe-box Sandbox
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">Terms</a>
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Documentation</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
