import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '5rem',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.75rem',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 0 rgba(0, 0, 0, 0.2)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
        'glow-red': '0 0 40px -10px rgba(236, 0, 0, 0.4)',
        'glow-white': '0 0 20px -5px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'shine': 'shine 3s linear infinite',
        'beam': 'beam 2s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        beam: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '0.3' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      backgroundColor: {
        primary: "#0A0A0A",
        secondary: "#111111",
        tertiary: "#1A1A1A",
      },
      textColor: {
        primary: "#FFFFFF",
        body: "#A1A1A1",
        secondary: "#737373",
        muted: "#525252",
      },
      colors: {
        cta: "#EC0000",
        "cta-hover": "#FF1F1F",
        "cta-accent": "#FF3B3B",
        "focus-ring": "#EC0000",
        "error": "#EF4444",
      }
    },
  },
  plugins: [],
};
export default config;
