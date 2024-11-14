import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        malachite: {
          "50": "#f0fdf1",
          "100": "#ddfbe1",
          "200": "#bcf6c4",
          "300": "#88ed98",
          "400": "#3cd755",
          "500": "#26c13f",
          "600": "#19a030",
          "700": "#177e29",
          "800": "#186325",
          "900": "#155221",
          "950": "#062d0e",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
