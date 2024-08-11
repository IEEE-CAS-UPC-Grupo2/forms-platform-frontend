import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "cas-white": "#ffffff",
      "cas-green": "#155544",
      "cas-black": "#000000",
      "cas-gray": "#2E2E31",
      "cas-gray-light": "#F2F2F2",
      "cas-red": "#C20000",
      "cas-gray-mid": "#979797",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      nav: "1440px",
      "2xl": "1536px",
      "3xl": "1600px",
      "4xl": "1920px",
      "5xl": "2560px",
      "6xl": "3440px",
    },
  },
  plugins: [],
};
export default config;
