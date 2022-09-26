/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{.js,jsx,ts,tsx}",
    "./components/**/*.{.js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media", // class 로 바꾸고 부모태그에 dark 클래스 추가
  plugins: [require("@tailwindcss/forms")],
};
