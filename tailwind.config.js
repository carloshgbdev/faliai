/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-base': '#2563eb',   // blue-600
        'primary-hover': '#1d4ed8',  // blue-700
        'primary-light': '#dbeafe',  // blue-100
        'bg-app': '#f8fafc',         // slate-50
        'bg-surface': '#ffffff',     // white
        'border': '#e2e8f0',         // slate-200
        'text-main': '#0f172a',      // slate-900
        'text-muted': '#64748b',     // slate-500
      }
    },
  },
  plugins: [],
}
