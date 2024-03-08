/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rgb: {
          '212-212-212': 'rgb(212, 212, 212)',
          azul: 'rgb(153, 205, 216)',
          'azul-claro': 'rgb(218, 235, 227)',
          bege: 'rgb(253, 232, 211)',
          rosa: 'rgb(243, 195, 178)',
          'verde-claro': 'rgb(207, 214, 196)',
          verde: 'rgb(101, 113, 102)',
          preto: '#000000',
          cinza: '#767f7c',
          vermelho: '#ff693e',
        },
      },
    },
  },
  plugins: [],
};
