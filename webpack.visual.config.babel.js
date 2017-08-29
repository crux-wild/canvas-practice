import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';

export default {
  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader',
        ]
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
          }
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/assets/index.html',
    }),
  ],

  devtool: 'eval-source-map',
}
