const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
   plugins: [
      new HtmlWebpackPlugin({
         title: "Webpack!",
         template: 'index.html'
      }),
   ]
};
