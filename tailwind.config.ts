import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-bg': '#fcfcfc',
        'retro-sidebar': '#f7f7f7',
        'retro-border': '#e5e5e5',
        'retro-text': '#111',
        'retro-green': '#22c55e',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
