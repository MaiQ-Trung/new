/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        'tr-10': '10px',
        'br-10': '10px',
      },
      margin: {
        '9px': '30px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

