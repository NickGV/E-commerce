/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'black-bg': "#121212",
        'card-bg': "#323232",
      }
    },
  },
  plugins: [],
}

