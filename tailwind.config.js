/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          'from': { opacity : '1' },
          'to': { opacity: '0' },
        },
      
    },
    fontFamily: {
      dollar: ["dollar", "sans"],
      clue: ["clue", "sans"],
      category: ["category", "sans"],
    },
  }
  },
  plugins: [ 
    
  ],
  mode: 'jit',
}

