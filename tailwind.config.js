module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/ag-grid-community/dist/styles/ag-grid.css',
    './node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}