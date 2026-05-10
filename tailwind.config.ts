import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0A',
          card: '#141414',
          elevated: '#1C1C1C',
        },
        gold: {
          primary: '#C9A96E',
          bright: '#E8C589',
          deep: '#8C6D3F',
        },
        text: {
          primary: '#F5F1E8',
          muted: '#8A8378',
        },
        border: { DEFAULT: '#2A2520' },
        success: '#A8B788',
        error: '#C97070',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
