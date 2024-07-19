import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        sm: "14px",
        xs: "13px",
        xxs: "16px",
        xl: "20px",
        lg: "17px",
        large: "18px",
        xxl: "22px",
      },
      fontFamily: {
        primary: ["Public Sans", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
        // fpopin: ["Poppins", "sans-serif"],
      },
      backgroundColor: {
        primary: "#0D0D0D",
      },
      colors: {
        primary: "rgba(101, 103, 110, 1)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderButton: "rgba(225, 228, 235, 1)",
        secondary: "rgba(144, 144, 144, 1)",
        boxBorder: "rgba(13, 13, 13, 1)",
        white: "rgb(255, 255, 255)",
        box: "rgba(28, 39, 90, 1)",
        navFont: "rgba(255, 255, 255, 1)",
        textSecondary: "rgba(17, 17, 17, 1)",
        backGroundPrimary: "rgba(239, 242, 246, 1)",
        innerAlignment: "rgba(196, 196, 196, 0)",
      },
    },
  },
  plugins: [],
};
export default config;
