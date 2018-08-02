const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
  mode: "development",
  entry: ["babel-polyfill", "./index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: true,
          }
        }
      },
      // {
      //   test: /\.(woff|woff2)$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       // Size limit of 50 kb
      //       // Above that emits separate files
      //       limit: 50000,
      //       mimetype: "application/font-woff",
      //       name: "./src/fonts/[name].[ext]",
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack!",
      template: 'index.html'
    }),
    // new GoogleFontsPlugin({
    //   fonts: [
    //     { family: "Oswald", variants: ["400", "700"] }
    //   ],
    //   filename: './style.css',
    //   path: './src/fonts/',
    //   formats: ["woff", "woff2"]
    // })
  ]
};

// 


