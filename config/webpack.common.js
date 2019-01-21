const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    main: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, './../dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:8].js'
  },

  module: {
    rules: [{
        test: /\.[jt]sx?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          limit: 4096,
          outputPath: 'static/',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ]
  },

  resolve: {
    // notice this settting should sync with tsconfig.json
    alias: {
      '@': path.resolve('./src'),
    },

    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      // favicon: './public/favicon.ico',
      inject: true,
    }),

    // new CopyWebpackPlugin([{
    //   from: '',
    //   to: '',
    // }, ]),
  ],
}
