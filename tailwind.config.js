/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        'input-background': 'var(--input-background)',
        'cis-white': 'var(--cis-white)',
        'cis-red': 'var(--cis-red)',
        'cis-green': 'var(--cis-green)',
        'cis-purple': 'var(--cis-purple)',
        'cis-online': 'var(--cis-online)',
        'cis-pin-active': 'var(--cis-pin-active)',
        'cis-voice-live': 'var(--cis-voice-live)',
      },
      borderRadius: {
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}