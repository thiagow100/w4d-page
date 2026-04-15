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
        'section': '8rem',
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
      },
      backgroundColor: {
        primary: "#000000",
        secondary: "#0A0A0A",
        tertiary: "#111111",
      },
      textColor: {
        primary: "#FFFFFF",
        secondary: "#565656",
      },
      colors: {
        cta: "#EC0000",
        "cta-hover": "#7A0000",
      }
    },
  },
  plugins: [],
};
export default config;
