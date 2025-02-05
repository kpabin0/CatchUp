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
        "f1": '"Roboto Condensed", serif;',
        "f2": '"Smooch Sans", serif;',
        "f3": '"Oswald", serif;',
        "f4": '"Inter", serif;',
        "f5": '"Roboto Slab", serif;',
        "f6": '"Lato", serif;',
        "main" : '"Roboto", serif;',
        "main-a" : 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        "main-alt" : '"Ysabeau SC", serif;',
      },
      fontSize : 
      {
        "title" : "1.2rem",
        "heading" : "1.9rem",
      },
    },
  },
  plugins: [],
}

