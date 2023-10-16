/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors : {
      opacity: '#f6edde',
      pages: '#2f3e46',
      putih: '#fff',
      biru: '#5fa8d3',
      merah: '#e07a5f',
      utama: '#d4a373',
      kedua: '#B6B6B6',
      ketiga: '#949CA9',
      keempat: '#2a9d8f',
      kelima: '#F4F4F4',
      kuning: '#FF9F1C',
      hitam: '#46494c',
      body: '#FBFAFA',
      second: '#fafafa',
      hijau: '#84a98c',
      card2: '#588157',
      card3: '#a3cef1',
      card4: '#d8572a',
  },
  extend: {
    fontFamily: {
        Roboto : ['Roboto', 'sans-serif'],
        PlusJakarta : ['Plus Jakarta Sans', 'sans-serif'],
    },
    dropShadow: {
        '3xl': '0px 4px 10px rgba(138, 142, 148, 0.05)',
        '4xl' : '0px 0px 24px #FBFAFA',
        '5xl': '0px 2px 12px rgba(0, 0, 0, 0.04)',
    },
  },
},
  plugins: [],
};
