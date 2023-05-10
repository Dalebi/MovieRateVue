/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate","lemonade", "night", "coffee", "winter"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui","@tailwindcss/typography")],
    //...
    

};
