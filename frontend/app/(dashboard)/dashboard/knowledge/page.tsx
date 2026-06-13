"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KnowledgePage() {
  const router = useRouter();

  useEffect(() => {
    // Knowledge Search is now fully integrated into the primary AI Workspace homepage
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center text-[#94A3B8] font-mono text-xs">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
        <span>Redirecting to AI Workspace...</span>
      </div>
    </div>
  );
}
