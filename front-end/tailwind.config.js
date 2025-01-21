module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        oswald: ['"Oswald"', "sans-serif"],
        robotoMono: ['"Roboto Mono"', "monospace"],
      },
      colors: {
        purple: {
          400: "#8A6BC6",
          500: "#7445B5",
        },
        green: {
          200: "#DFFFD9",
          300: "#A7F3D0",
        },
      },
    },
  },
  plugins: [],
};
