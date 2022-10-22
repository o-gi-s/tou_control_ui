const merge = require("webpack-merge");
const path = require("path");
const base = require("./webpack.config.js");
const ExtensionReloader = require("webpack-extension-reloader");

module.exports = merge(base, {
  mode: "development",
  watch: true,
  resolve: {
    extensions: [".js", ".tsx", ".ts"]
  },
  plugins: [
    new ExtensionReloader({
      manifest: path.resolve(__dirname, "./public/manifest.json"),
      port: 3001,
      reloadPage: true
    })
  ]
});
