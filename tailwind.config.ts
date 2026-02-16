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
      boxShadow: {
        'card': '0 4px 24px -4px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px -8px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
