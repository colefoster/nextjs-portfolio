/** @type {import('tailwindcss').Config} */
module.exports = {
  themes: [
    {
      mytheme: {
      "primary": "#661AE6",
      "secondary": "#D926AA",
      "accent": "#1FB2A5",  
      "neutral": "#191D24",  
      "base-100": "#2A303C", 
      "info": "#3ABFF8",
      "success": "#36D399",
      "warning": "#FBBD23",
      "error": "#F87272",
      },
    },
  ],
  content: [
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  darkMode: 'media', // or 'media' or 'class'

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
    require('tailwind-scrollbar'),
    require('daisyui'),
    require('prettier-plugin-tailwindcss'),
  ],
  mode: 'jit',
}

