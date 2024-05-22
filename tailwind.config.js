/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "#6c40aa",
        background: "#f3f3f3",
        light: "#7c5daf",
        fade: "#8d7ab4",
        grey: "#9e97b9",
        background_dark: "#001529",
        background_semidark: "#010729",
      },
    },
  },
  plugins: [],
};
