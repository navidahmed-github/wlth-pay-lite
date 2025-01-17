/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0054a4", // WLTH Pay's primary blue color
        secondary: "#f4f4f4", // Light gray background
        accent: "#e63946", // Highlight color (if used)
      },
    },
  },
  plugins: [],
};
