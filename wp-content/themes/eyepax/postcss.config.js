module.exports = {
	// parser: 'postcss-sass',
  plugins: [
    require('postcss-import'),
		require('tailwindcss'),
		require('postcss-nested'),
    require('autoprefixer'),
  ]
}