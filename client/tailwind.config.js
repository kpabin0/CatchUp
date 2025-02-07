/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: 
      {
        "theme": "#16C47F",
        "theme-alt": "#05B36E",
        "theme-cont": "#FF9D23",
        "theme-cont-alt": "#EE8C12",
        "theme-w": "#ffffff",
        "theme-w-alt": "#efefef",
        "theme-g": "#bababa",
        "theme-g-alt": "#aaaaaa",
        "theme-green": "#04AA6D",
        "theme-red": "#F93827",
      },
      fontFamily : 
      {
        "f6": '"Lato", serif;',
      },
      fontSize : 
      {
        "title" : "1.2rem",
        "heading" : "1.9rem",
        "ti": "0.68rem"
      },
    },
  },
  plugins: [],
}

