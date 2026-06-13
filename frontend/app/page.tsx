"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  GitBranch, 
  MessageSquare, 
  AlertOctagon, 
  Terminal,
  Check
} from "lucide-react";

// Interactive Typewriter Chat Mock Component
function TypewriterDemo() {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const question = "Why is Sprint 24 delayed?";
  
  const response = `Based on current sprint activity:
• Alice Chen is handling the Qdrant integration. She has 8 active tickets.
• Development is waiting on sandbox credential approvals.
• Recommendation: Reassign 2 tasks to Bob Kumar to clear the block.`;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (step === 0) {
      // Wait before typing starts
      timer = setTimeout(() => setStep(1), 1000);
    } else if (step === 1) {
      // Typing the question
      if (typedText.length < question.length) {
        timer = setTimeout(() => {
          setTypedText(question.slice(0, typedText.length + 1));
        }, 80);
      } else {
        // Typing finished, wait before showing AI response
        timer = setTimeout(() => setStep(2), 800);
      }
    } else if (step === 2) {
      // Streaming the response
      if (aiOutput.length < response.length) {
        timer = setTimeout(() => {
          setAiOutput(response.slice(0, aiOutput.length + 1));
        }, 15);
      } else {
        // Completed loop, reset after 5 seconds
        timer = setTimeout(() => {
          setStep(0);
          setTypedText("");
          setAiOutput("");
        }, 5000);
      }
    }

    return () => clearTimeout(timer);
  }, [step, typedText, aiOutput]);

  return (
    <div className="w-full bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 shadow-xl space-y-4">
      {/* Search Header */}
      <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.08)] pb-3">
        <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
        <div className="text-xs text-[#94A3B8] font-medium ml-2 font-sans">Ask EngineerMind</div>
      </div>
      
      {/* Query Bar */}
      <div className="p-3 bg-[#0B1220] border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-[#F8FAFC]">
        <span className="text-[#94A3B8]">Ask: </span>
        <span className="font-semibold">{typedText}</span>
        {step === 1 && <span className="animate-pulse">|</span>}
      </div>

      {/* AI Answer Stream */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 text-sm text-[#F8FAFC] leading-relaxed pt-2 border-t border-[rgba(255,255,255,0.04)]"
          >
            <div className="flex items-center gap-1.5 text-xs text-[#2563EB] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Analysis</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-[#94A3B8] text-xs md:text-sm">
              {aiOutput}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] font-sans selection:bg-[#2563EB]/30 selection:text-white">
      {/* Header */}
      <header className="max-layout-width px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base text-[#F8FAFC] tracking-tight">
            EngineerMind
          </span>
        </div>
        <div>
          <Link
            href="/signup"
            className="text-xs font-semibold bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-layout-width content-container py-24 flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight">
          Your Engineering Team's AI Copilot
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-[#94A3B8] max-w-2xl mb-12">
          Understand repositories. Summarize meetings. Predict risks. Ship faster.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            Get Started
          </Link>
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#111827] border border-[rgba(255,255,255,0.08)] hover:border-slate-700 text-[#94A3B8] hover:text-[#F8FAFC] font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            Watch Demo
          </a>
        </div>

        {/* Hero Divider (lots of whitespace) */}
        <div className="h-12" />
      </section>

      {/* Section 2: Simple Workflow */}
      <section className="bg-[#111827]/30 border-t border-b border-[rgba(255,255,255,0.04)] py-20">
        <div className="max-layout-width content-container text-center">
          <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-widest mb-12">
            Simple Workflow Integration
          </h2>
          
          {/* Workflow path */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              "Connect Repository",
              "Connect Meetings",
              "AI Understands Context",
              "Get Insights",
              "Ship Better Software"
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-4">
                <div className="px-5 py-3.5 rounded-xl bg-[#111827] border border-[rgba(255,255,255,0.06)] text-sm font-semibold text-slate-200 shadow-md">
                  {step}
                </div>
                {idx < arr.length - 1 && (
                  <span className="text-[#94A3B8] font-bold text-lg rotate-90 md:rotate-0">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Demo */}
      <section id="demo" className="py-24 max-layout-width content-container">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              See it in action
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Watch how our assistant connects context and provides instant recommendations.
            </p>
          </div>
          
          <TypewriterDemo />
        </div>
      </section>

      {/* Section 4: Exactly 4 Feature Cards */}
      <section className="py-24 bg-[#111827]/20 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-layout-width content-container">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              Core Capabilities
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Unifying four pillars of engineering context in one clean workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="p-6 bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-[#2563EB]" />
              </div>
              <h3 className="text-base font-bold text-white">Repository Intelligence</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Analyze commits, pull requests, and files to generate architecture maps, release logs, and developer change logs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#10B981]" />
              </div>
              <h3 className="text-base font-bold text-white">Meeting Intelligence</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Transcribe standups and planning calls to extract key action lists, decisions logs, and export them directly as tickets.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <h3 className="text-base font-bold text-white">Risk Prediction</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Predict sprint delays, developer queue overloads, and system design blockers before they turn into critical alerts.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
              </div>
              <h3 className="text-base font-bold text-white">AI Workspace</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                A unified ChatGPT-style workspace to search across codebases, meetings, issues, and PR reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-24 max-layout-width content-container text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Ready to align your team?
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Get started with our development sandbox. Connect your first repo in 30 seconds.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] py-12 px-8 bg-[#0B1220]">
        <div className="max-layout-width flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <div>© {new Date().getFullYear()} EngineerMind AI. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
