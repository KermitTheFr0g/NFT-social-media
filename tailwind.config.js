/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-black': '#131314',
        'top-nav': '#101011',
        'accent-black': '#2F2F31'
      },
      fontFamily: {
        'title': ['Roboto-Thin'],
        'main': ['IBM-Plex']
      }
    },
  },
  plugins: [],
}