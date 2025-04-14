/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#185871",
        "primary-dark": "#124354",
        "primary-light": "#e0f2f7",
        secondary: "#1919c3",
        tertiary: "#3c9a66",
        "accent-light": "#c8ac87",
        accent: "#9b7956",
        whiteGray: "#ebebeb",
        blueLight: "#edfcfe",
        whiteAmber: "#fff8e1",
        whiteStone: "#f8fafc",
        whiteStoneDark: "#f1f5f9",
      },
      fontFamily: {
        sans: ["var(--font-josefin-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
