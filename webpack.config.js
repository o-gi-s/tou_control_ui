const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".tsx", ".ts"]
  },
  entry: {
    content: "./src/content.tsx",
    background: "./src/background.ts"
  },
  output: {
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/background.html",
      filename: "./background.html",
      chunks: ["background"]
    }),
    new HtmlWebPackPlugin({
      template: "./public/content.html",
      filename: "./content.html",
      chunks: ["content"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin([{ from: "./public/manifest.json", to: "manifest.json" }])
  ]
};
