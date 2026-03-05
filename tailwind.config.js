/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#05050f',
        foreground: '#e8e8f0',
        card: '#0c0c20',
        'card-foreground': '#e8e8f0',
        primary: '#00e5ff',
        'primary-foreground': '#05050f',
        secondary: '#7c3aed',
        'secondary-foreground': '#e8e8f0',
        muted: '#8888aa',
        'muted-foreground': '#8888aa',
        accent: '#00e5ff',
        'accent-foreground': '#05050f',
        destructive: '#EF4444',
        border: '#2A2A35',
        'card-border': '#1E1E28',
        input: '#080815',
        ring: '#00e5ff',
        success: '#00ff9d',
        warning: '#ff6b35',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
