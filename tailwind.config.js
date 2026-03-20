/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        'portfolio-blue': '#5ba8f5',
        'portfolio-dark': '#020408',
        'portfolio-secondary': '#1e3a5f',
        'portfolio-text': '#dce8f5',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease both',
        'fade-in': 'fadeIn 1s ease both',
        'pulse-slow': 'pulse 2s infinite',
        'marquee': 'marquee 24s linear infinite',
        'drift': 'drift 14s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
