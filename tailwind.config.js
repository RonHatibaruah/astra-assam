/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        assam: {
          dark: '#0B132B',
          navy: '#1C2541',
          teal: '#3A506B',
          cyan: '#5BC0BE',
          gold: '#E0A96D',
          alert: '#E63946',
          success: '#2A9D8F',
          warning: '#F4A261'
        }
      }
    },
  },
  plugins: [],
}
