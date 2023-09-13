/** @type {import('tailwindcss').Config} */
export const content = ["./index.html","./src/**/*.{vue,js}"];
export const theme = {
  extend: {
    colors: {
      'weather-primari': '#00668A',
      'weather-secondary': '#004E71'
    }
  },
  FontFamily: {
    Roboto: ['Roboto, sans-serif']
  },
  container: {
    padding: '2rem',
    center: true
  },
  screens: {
    sm: '640px',
    md: '768px'
  }
};
export const plugins = [];




