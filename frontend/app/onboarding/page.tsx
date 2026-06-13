"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Video, 
  User, 
  Terminal, 
  Check, 
  Shield, 
  Monitor, 
  Compass, 
  Plus,
  Upload
} from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [goal, setGoal] = useState("");
  
  // AI Indexing log lines animation
  const [logLines, setLogLines] = useState<string[]>([]);
  const [indexingComplete, setIndexingComplete] = useState(false);

  const logs = [
    "Analyzing repository metadata...",
    "✔ Found 23 contributors",
    "✔ Indexed 1,234 files in code registry",
    "✔ Processed 54 pull requests & commits",
    "✔ Extracted codebase architecture guidelines",
    "Indexing complete! Workspace is ready."
  ];

  useEffect(() => {
    if (currentStep === 4) {
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < logs.length) {
          setLogLines(prev => [...prev, logs[idx]]);
          idx++;
        } else {
          clearInterval(interval);
          setIndexingComplete(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleSelectGoal = (selectedGoal: string) => {
    setGoal(selectedGoal);
    // Auto-advance to indexing step
    setCurrentStep(4);
  };

  const handleFinishOnboarding = () => {
    // Save onboarding state so layout allows access
    localStorage.setItem("onboarded", "true");
    localStorage.setItem("userGoal", goal);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-6 selection:bg-[#2563EB]/30 selection:text-white">
      <div className="w-full max-w-lg p-8 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl space-y-8 shadow-xl">
        
        {/* Top Wizard Steps Indicator */}
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs font-bold text-slate-200">Setup Workspace</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span className={currentStep >= 1 ? "text-[#2563EB]" : ""}>1</span>
            <span>•</span>
            <span className={currentStep >= 2 ? "text-[#2563EB]" : ""}>2</span>
            <span>•</span>
            <span className={currentStep >= 3 ? "text-[#2563EB]" : ""}>3</span>
            <span>•</span>
            <span className={currentStep >= 4 ? "text-[#2563EB]" : ""}>4</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Connect Repository */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Connect Repository</h2>
                <p className="text-xs text-[#94A3B8]">To get code intelligence and commit risk modeling, connect your codebase.</p>
              </div>

              <div className="p-8 border border-dashed border-[rgba(255,255,255,0.08)] rounded-xl bg-[#0B1220]/50 text-center space-y-4">
                <GithubIcon className="w-10 h-10 text-slate-500 mx-auto" />
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  Connect GitHub
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Connect Meetings */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Connect Meetings</h2>
                <p className="text-xs text-[#94A3B8]">Pick meeting vectors to fetch summaries and extract action checklist tickets.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Google Meet", icon: Video },
                  { label: "Zoom", icon: Video },
                  { label: "Upload recordings", icon: Upload }
                ].map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.label}
                      onClick={handleNextStep}
                      className="p-5 border border-[rgba(255,255,255,0.08)] bg-[#0B1220]/40 rounded-xl hover:border-[#2563EB] text-center space-y-2 cursor-pointer transition-all"
                    >
                      <Icon className="w-6 h-6 text-[#94A3B8] mx-auto" />
                      <span className="text-xs font-bold text-slate-200 block">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Choose Your Goal */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Choose Your Goal</h2>
                <p className="text-xs text-[#94A3B8]">Select your workspace role to customize your layout and features prompts.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "developer", label: "Developer", desc: "For direct code reviews and semantic files navigation" },
                  { id: "manager", label: "Engineering Manager", desc: "To mitigate delays and review team workload density" },
                  { id: "founder", label: "Founder", desc: "For release updates, summary docs, and general overview" },
                  { id: "product", label: "Product Manager", desc: "For decisions checklists tracking and tickets export" }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectGoal(opt.label)}
                    className="p-5 border border-[rgba(255,255,255,0.08)] bg-[#0B1220]/40 rounded-xl hover:border-[#2563EB] text-left space-y-1.5 cursor-pointer transition-all"
                  >
                    <span className="text-xs font-bold text-slate-200 block">{opt.label}</span>
                    <span className="text-[10px] text-[#94A3B8] block leading-normal">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: AI Indexing */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-white mb-1">AI Indexing Context</h2>
                <p className="text-xs text-[#94A3B8]">Analyzing connected context to build vector references. Please wait.</p>
              </div>

              {/* Indexer logs block */}
              <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.08)] p-5 rounded-xl font-mono text-xs text-[#94A3B8] space-y-2 min-h-[160px]">
                {logLines.map((line, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[#2563EB]">$</span>
                    <span>{line}</span>
                  </div>
                ))}
                
                {!indexingComplete && (
                  <div className="flex gap-1.5 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
              </div>

              {indexingComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-2"
                >
                  <button
                    onClick={handleFinishOnboarding}
                    className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.25)] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch Workspace</span>
                    <Check className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
