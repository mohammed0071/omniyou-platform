/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        foreground: '#FAFAFA',
        card: '#0F172A',
        'card-foreground': '#FAFAFA',
        primary: '#00D4FF',
        'primary-foreground': '#0A0A0F',
        secondary: '#1E293B',
        'secondary-foreground': '#FAFAFA',
        muted: '#334155',
        'muted-foreground': '#94A3B8',
        accent: '#00D4FF',
        'accent-foreground': '#0A0A0F',
        destructive: '#EF4444',
        border: '#1E293B',
        input: '#1E293B',
        ring: '#00D4FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
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
