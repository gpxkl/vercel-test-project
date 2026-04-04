/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define Pen document colors here
        // These are examples, replace with actual values from Pen document if available or standard Tailwind palette
        primary: 'hsl(var(--primary))',
        primaryForeground: 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        muted: 'hsl(var(--muted))',
        mutedForeground: 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        accentForeground: 'hsl(var(--accent-foreground))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        cardBackground: 'hsl(var(--card-background))',
        border: 'hsl(var(--border))',
        cisGreen: 'hsl(var(--cis-green))',
        cisOrange: 'hsl(var(--cis-orange))',
        cisPurple: 'hsl(var(--cis-purple))',
        cisOlive: 'hsl(var(--cis-olive))',
        cisGlassWhite: 'rgba(255, 255, 255, 0.15)', // Assuming glass effect is a semi-transparent white
        cisBgMuted: 'hsl(var(--cis-bg-muted))',
      },
      borderRadius: {
        // Define Pen document border radii here
        radiusXl: '12px',
        radiusMd: '6px',
      },
      fontSize: {
        // Define Pen document font sizes here
        textH3: '24px',
        textH4: '20px',
        textBase: '16px',
        textLabel: '14px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}