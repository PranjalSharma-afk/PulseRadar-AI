import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ]
      },
      colors: {
        background: "#ffffff",
        surface: "#fafafa",
        surfaceElevated: "#ffffff",
        accent: {
          DEFAULT: "#000000",
          soft: "#333333"
        },
        neon: {
          blue: "#000000",
          purple: "#000000"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 0, 0, 0.1)",
        soft: "0 8px 30px rgba(0, 0, 0, 0.08)"
      },
      backgroundImage: {
        "radial-faded": "none"
      },
      animation: {
        "twinkle": "twinkle 3s ease-in-out infinite",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      }
    }
  },
  plugins: []
};

export default config;

