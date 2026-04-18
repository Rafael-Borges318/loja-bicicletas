/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: '#058002',
        color2: '#3ca033',
        color3: '#74bf64',
        color4: '#abdf95',
        color5: '#e3ffc6',
        primary: '#058002',
        secondary: '#3ca033',
        accent: '#74bf64',
        light: '#e3ffc6',
      }
    },
  },
  plugins: [],
}

