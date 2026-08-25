import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush:  '#f7e8e8',
        rose:   '#c97b84',
        petal:  '#e8c4c4',
        cream:  '#fdf8f5',
        mink:   '#8b6f6f',
        bark:   '#3d2b2b',
        sand:   '#f2ede8',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;