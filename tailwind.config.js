/** @type {import('tailwindcss').Config} */
const { colors } = require("tailwindcss/colors");
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
        brand: {
          purple: "#AD1FEA",
          royal_blue: "#4661E6",
          american_blue: "#373F68",
          alice_blue: "#F2F4FF",
          ghost_white: "#F7F8FD",
          blue_gray: "#647196",
          tangerine: "#F49F85",
          maya_blue: "#62BCFA",
        },
      },
    },
  },
  plugins: [],
};
