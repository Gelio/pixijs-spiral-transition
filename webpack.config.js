const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CheckerPlugin } = require('awesome-typescript-loader');

const config = {
  sourcePath: path.resolve(__dirname, "src"),
  distPath: path.resolve(__dirname, "dist")
};

module.exports = {
  entry: path.join(config.sourcePath, "app.ts"),
  output: {
    path: config.distPath,
    filename: "app.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      }
    ]
  },
  devtool: "source-map",
  plugins: [new HtmlWebpackPlugin(), new CheckerPlugin()]
};
