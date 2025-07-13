// webpack.config.js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin'); 

module.exports = {
  mode: 'production',
  entry: './src/js/content.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true 
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '.' }, 
        { from: 'icons', to: 'icons' }, 
        { from: 'src/css/styles.css', to: 'styles.css' } // ✅ Copia o CSS
      ],
    }),
  ],
  devtool: 'source-map'
};