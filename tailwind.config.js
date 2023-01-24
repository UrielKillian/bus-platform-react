/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pal1: "#02182B",
        pal2: "#0197F6",
        pal3: "#D7263D",
        pal4: "#448FA3",
        pal5: "#68C5DB",
        admin1: "#C4D6B0",
        admin2: "#477998",
        admin3: "#291F1E",
        admin4: "#F64740",
        admin5: "#A3333D",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
