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
        color1: 'rgba(0, 199, 190, 0.5)',
        color2: 'rgba(99, 230, 226, 0.8)',
        color3: 'rgba(12, 129, 123, 0.2)',
        color4: 'rgba(102, 212, 207, 1)',
        color5: 'rgba(48, 176, 199, 0.3)',
        color6: 'rgba(64, 200, 224, 0.7)',
        color7: 'rgba(0, 130, 153, 0.1)',
        color8: 'rgba(93, 230, 255, 0.9)',
        color9: 'rgba(50, 173, 230, 0.4)',
        color10: 'rgba(100, 210, 255, 0.6)',
        color11: 'rgba(0, 113, 164, 0.0)',
        color12: 'rgba(112, 215, 255, 1)',
        color13: 'rgba(0, 122, 255, 0.5)',
        color14: 'rgba(10, 132, 255, 0.8)',
        color15: 'rgba(0, 64, 221, 0.2)',
        color16: 'rgba(64, 156, 255, 1)',
        color17: 'rgba(88, 86, 214, 0.3)',
        color18: 'rgba(94, 92, 230, 0.7)',
        color19: 'rgba(54, 52, 163, 0.1)',
        color20: 'rgba(125, 122, 255, 0.9)',
        customRed1: 'rgba(255, 45, 85, 0.8)',  // Red with 80% opacity
        customRed2: 'rgba(255, 55, 95, 0.7)',  // Red with 70% opacity
        customMaroon1: 'rgba(211, 15, 69, 0.9)', // Dark red with 90% opacity
        customPink1: 'rgba(255, 100, 130, 0.6)', // Pink with 60% opacity
        customMaroon2: 'rgba(194, 6, 24, 0.9)', // Dark maroon with 90% opacity
        customOrangeRed1: 'rgba(255, 59, 48, 0.8)',  // Orange-red with 80% opacity
        customOrangeRed2: 'rgba(255, 69, 58, 0.7)',  // Lighter orange-red with 70% opacity
        customDarkRed: 'rgba(215, 0, 21, 0.9)', // Dark red with 90% opacity
        customPink2: 'rgba(255, 105, 97, 0.6)', // Light pink with 60% opacity
        customBlue: '#4900e1',
        customPink: '#e10098',
        customGreen: '#98e100',
        customTeal: '#00e149',
        customBlueGreen: '#00e1ba',

      },

      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatingSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '50%': { transform: 'translateY(-15px) rotate(15deg)' },
        },
      },
      animation: {
        floating: 'floating 5s ease-in-out infinite',
        'floating-slow': 'floatingSlow 10s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
