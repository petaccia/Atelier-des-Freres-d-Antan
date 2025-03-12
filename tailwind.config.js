// tailwind.config.js
export default {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#046bd2', // Bleu principal (extrait de votre CSS)
        secondary: '#f9fafb', // Gris clair
        accent: '#9b7956', // Marron pour les hover
      },
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      // Nouveauté V4 : Gestion améliorée des breakpoints
      screens: {
        'xs': '475px', // Mobile
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
  // Nouveauté V4 : Mode JIT par défaut
  mode: 'jit',
};