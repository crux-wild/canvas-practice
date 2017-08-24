import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';

export default {
  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },

  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/assets/index.html',
    }),
  ],

  devtool: 'eval-source-map',
}
