"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export default function SignupPage() {
  const router = useRouter();

  const handleOAuthLogin = (provider: string) => {
    // Faux login triggers onboarding flow
    console.log(`Logging in via ${provider}...`);
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-6 selection:bg-[#2563EB]/30 selection:text-white">
      <div className="w-full max-w-md p-8 bg-[#111827] border border-[rgba(255,255,255,0.08)] rounded-xl space-y-8 shadow-xl text-center">
        {/* Branding Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.25)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            Welcome to EngineerMind
          </h1>
          <p className="text-xs text-[#94A3B8]">
            Set up your AI copilot and start shipping better code.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3.5">
          <button
            onClick={() => handleOAuthLogin("github")}
            className="w-full py-3 px-4 bg-[#0B1220] hover:bg-[#0B1220]/80 border border-[rgba(255,255,255,0.08)] text-slate-100 font-semibold text-sm rounded-lg flex items-center justify-center gap-2.5 transition-colors group cursor-pointer"
          >
            <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            <span>Continue with GitHub</span>
          </button>
          
          <button
            onClick={() => handleOAuthLogin("google")}
            className="w-full py-3 px-4 bg-[#0B1220] hover:bg-[#0B1220]/80 border border-[rgba(255,255,255,0.08)] text-slate-100 font-semibold text-sm rounded-lg flex items-center justify-center gap-2.5 transition-colors group cursor-pointer"
          >
            <GoogleIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Back Link */}
        <div className="pt-2 text-xs text-[#94A3B8]">
          <Link href="/" className="hover:text-white underline transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
