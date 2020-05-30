var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ['./index.js', './scss/main.scss'],
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: "file-loader"
      }    
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
};
