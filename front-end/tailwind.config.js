module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        thin: '0px 0px 1px rgba(0,0,0,6.5)',
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        oswald: ['"Oswald"', "sans-serif"],
        robotoMono: ['"Roboto Mono"', "monospace"],
        montserrat: ["Montserrat", "sans-serif"], // Add Montserrat
      },
      colors: {
        purple: {
          400: "#8A6BC6",
          500: "#7445B5",
          400: "#8A6BC6",
          500: "#7445B5",
        },
        green: {
          200: "#DFFFD9",
          300: "#A7F3D0",
          200: "#DFFFD9",
          300: "#A7F3D0",
        },
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};
