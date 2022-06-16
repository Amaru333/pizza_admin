module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        apptheme: {
          100: "#EF5350",
          200: "#F77C79",
          300: "#B61827",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
