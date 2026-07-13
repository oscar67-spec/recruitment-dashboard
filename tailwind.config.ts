import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#F7F8FA",
        surface: "#FFFFFF",
        ink: "#1A1D23",
        muted: "#6B7280",
        line: "#E5E7EB",
        brand: "#4F46E5",
        elite: "#059669",
        potential: "#D97706",
        rejected: "#DC2626",
        new: "#2563EB",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
