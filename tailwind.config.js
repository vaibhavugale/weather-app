/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto: ['Roboto', 'sans-serif'],
        sans: ['Ubuntu', 'Arial', 'sans-serif'],
      },
      backgroundImage:{
        "Clouds":"url('/src/assets/cloud.jpeg')",
        "Rain":"url('/src/assets/rain.jpeg')",
        "Clear":"url('/src/assets/clear.jpeg')",

      }
    },
  },
  plugins: [],
}