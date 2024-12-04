import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        malachite: {
          '50': '#f0fdf1',
          '100': '#ddfbe1',
          '200': '#bcf6c4',
          '300': '#88ed98',
          '400': '#3cd755',
          '500': '#26c13f',
          '600': '#19a030',
          '700': '#177e29',
          '800': '#186325',
          '900': '#155221',
          '950': '#062d0e',
        },
        fontSize: {
          xs: '8px',
          sm: '10px',
        },
        screens: {
          sm: '640px',
          // => @media (min-width: 640px) { ... }

          md: '768px',
          // => @media (min-width: 768px) { ... }

          lg: '1024px',
          // => @media (min-width: 1024px) { ... }

          xl: '1280px',
          // => @media (min-width: 1280px) { ... }

          '2xl': '1536px',
          // => @media (min-width: 1536px) { ... }
        },
      },
    },
  },
  plugins: [],
} satisfies Config
