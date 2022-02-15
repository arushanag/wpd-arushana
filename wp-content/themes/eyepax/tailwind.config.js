module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        brand: '#25b28c' 
      },
      height: theme => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      fontSize: {
        "5.5xl": "3.5rem",
        "6.5xl":"8rem",
        "7xl": "12rem"
      },
      backgroundColor: theme => ({
        'blue-450': '#00aab9',
      })
    },
  },
  variants: {},
  plugins: [],
}
