/** @type {import('tailwindcss').Config} */

//  "./app/**/*.{js,ts,jsx,tsx}",
//   "./pages/**/*.{js,ts,jsx,tsx}",
//   "./components/**/*.{js,ts,jsx,tsx}",
//   // Or if using `src` directory:
//   "./src/**/*.{js,ts,jsx,tsx}",
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
          alice_blue: "#F2F4FE",
          ghost_white: "#F7F8FD",
          blue_gray: "#647196",
          tangerine: "#F49F85",
          maya_blue: "#62BCFA",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
