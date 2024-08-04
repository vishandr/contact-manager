/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontSize: {
        'base': '16px',
      },
    },
  },
  plugins: [],
}

