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
      }
    ]
  },

  imageWebpackLoader: {
    mozjpeg: {
      quality: 65,
    },
    pngquant:{
      quality: "65-90",
      speed: 4,
    },
    svgo:{
      plugins: [
        {
          removeViewBox: false,
        },
        {
          removeEmptyAttrs: false,
        }
      ]
    }
  },
};
