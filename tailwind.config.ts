import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
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
