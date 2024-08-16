/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      keyframes: {
        dropdown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        dropup: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
      },
      animation: {
        dropdown: "dropdown 0.5s ease forwards",
        dropup: "dropup 0.5s ease forwards",
      },
      borderRadius: {
        "tr-10": "10px",
        "br-10": "10px",
      },
      margin: {
        "9px": "30px",
      },
      fontFamily: {
        roboto: ['"Lato"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
