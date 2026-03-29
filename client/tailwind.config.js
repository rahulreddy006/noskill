/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["Instrument Sans", "sans-serif"],
        serif: ["Lora", "serif"],
      },
      colors: {
        parchment: { DEFAULT: "#F5F0E8", light: "#FAF7F2" },
        ink:       { DEFAULT: "#2C2416", muted: "#7A6B5A", faint: "#8C7B6B" },
        walnut:    { DEFAULT: "#8B5C2A", light: "#C4892A" },
        sand:      { DEFAULT: "#E0D5C5", light: "#EDE6D8", dark: "#D4C5A9" },
      },
    },
  },
  plugins: [],
};