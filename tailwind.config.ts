import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,tsx,mdx}",
    "./components/**/*.{js,ts,tsx,mdx}",
    "./app/**/*.{js,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#121212",
          light: "#1A1A1A",
          muted: "#2A2A2A",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C467",
          dark: "#B8942A",
        },
        workshop: {
          cream: "#FAF6F1",
          brown: "#3D2B1F",
        }
      },
      fontFamily: {
        serif: ["'DM Serif Display'", "serif"],
        sans: ["'Nunito'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
