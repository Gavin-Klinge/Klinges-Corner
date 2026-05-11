import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07080b',
        panel: '#101116',
        muted: '#a3a3a3',
        ember: '#ff304f',
        ruby: '#c91532',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 48, 79, 0.28)',
        card: '0 18px 70px rgba(0, 0, 0, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        rise: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '0.8' }, '50%': { opacity: '1' } },
      },
      animation: {
        rise: 'rise 500ms ease both',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
