import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        115: '1.15',
      },
      colors: {
        customBlue: '#4900e1',
        customPink: '#e10098',
        customGreen: '#98e100',
        customTeal: '#00e149',
        customBlueGreen: '#00e1ba',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
