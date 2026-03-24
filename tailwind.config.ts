import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        accent: '#4CAF50',
        button: '#2a2a2a',
        panel: '#ccc8c8',
      },
      fontFamily: {
        sans: ['cursive', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
export default config
