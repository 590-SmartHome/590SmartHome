/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui')
  ],
  daisyui: {
    themes: ["emerald", "dim"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  },
}

