/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "600px",
      md: "850px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "rgb(0 0 0)",
      primary: {
        light: "#61AB69",
        DEFAULT: "#F68716",
        dark: "#1F61A0",
      },
      secondary: {
        light: "#05CFDF",
        DEFAULT: "#358C9D",
        dark: "#00374B",
      },
      slate: {
        100: "#190C00",
        200: "rgba(208, 213, 221, 0.76)",
        300: "#A6A6A6",
        400: "#94A3B8",
        500: "#312A50",
      },
      yellow: {
        100: "#EACF1A",
      },
      rose: {
        300: "#FF0000",
      },
    },
    fontSize: {
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "30px",
      "2xl": "40px",
      "3xl": ["50px", "20.4px"],
      "4xl": ["90px", "50.4px"],
      "5xl": "",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-antonio)", ...fontFamily.sans],
        serif: ["Helvetica", "Arial", "sans-serif"], // First font
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
        navbar: "0px -12px 25px -17px rgba(110,110,110,1)",
        md: "0px 0px 14.6px 0px #71717140",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #000000 -14.66%, rgba(0, 0, 0, 0) 135.14%)",
      },
    },
  },
  plugins: [],
};
