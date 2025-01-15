/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: 
      {
        "theme": "#5019e4",
        "theme-alt": "#3007c2",
        "theme-cont" : "#FA4032",
        "theme-cont-alt" : "#d93021",
        "theme-w" : "#ffffff",
        "theme-w-alt" : "#dedede",
        "theme-g" : "#bababa",
        "theme-g-alt" : "#aaaaaa",
      },
      fontFamily : 
      {
        "main" : '"Roboto", serif',
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

