import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aurora Forge Design System
        background: "#0B0F14",
        surface: "#111827",
        elevated: "#161E2E",
        border: "#1E2A3A",
        "border-subtle": "#162032",
        
        accent: {
          DEFAULT: "#D4A017",
          hover: "#E5B428",
          muted: "rgba(212, 160, 23, 0.12)",
          subtle: "rgba(212, 160, 23, 0.06)",
        },
        blue: {
          DEFAULT: "#2F6BFF",
          hover: "#4A7EFF",
          muted: "rgba(47, 107, 255, 0.12)",
          subtle: "rgba(47, 107, 255, 0.06)",
        },
        success: {
          DEFAULT: "#00B67A",
          muted: "rgba(0, 182, 122, 0.12)",
        },
        warning: {
          DEFAULT: "#FF9F0A",
          muted: "rgba(255, 159, 10, 0.12)",
        },
        danger: {
          DEFAULT: "#FF453A",
          muted: "rgba(255, 69, 58, 0.12)",
        },
        
        // Text hierarchy
        "text-primary": "#F0F4F8",
        "text-secondary": "#8A9BB0",
        "text-muted": "#4A5568",
        "text-accent": "#D4A017",
      },
      
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Satoshi", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      
      backgroundImage: {
        "aurora-gradient": "linear-gradient(135deg, #0B0F14 0%, #0F1923 50%, #0B0F14 100%)",
        "accent-gradient": "linear-gradient(135deg, #D4A017 0%, #E5B428 100%)",
        "blue-gradient": "linear-gradient(135deg, #2F6BFF 0%, #4A7EFF 100%)",
        "surface-gradient": "linear-gradient(180deg, #161E2E 0%, #111827 100%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
        "hero-radial": "radial-gradient(ellipse at 50% 0%, rgba(47, 107, 255, 0.12) 0%, transparent 70%)",
        "glow-accent": "radial-gradient(circle at center, rgba(212, 160, 23, 0.15) 0%, transparent 70%)",
      },
      
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(30, 42, 58, 0.8)",
        "card-hover": "0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(47, 107, 255, 0.2)",
        "accent-glow": "0 0 24px rgba(212, 160, 23, 0.2)",
        "blue-glow": "0 0 24px rgba(47, 107, 255, 0.2)",
        "success-glow": "0 0 16px rgba(0, 182, 122, 0.2)",
        "elevated": "0 8px 32px rgba(0,0,0,0.6)",
        "modal": "0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(30, 42, 58, 0.8)",
        "inset-subtle": "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-up": "fadeUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "orbit": "orbit 20s linear infinite",
      },
      
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
      },
      
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;
