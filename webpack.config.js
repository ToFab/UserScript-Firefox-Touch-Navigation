//webpack.config.js
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  entry: {
    main: "./src/Main.ts",
  },
  output: {
    path: path.resolve(__dirname, './Demo'),
    filename: 'app-bundle.js?t=' + new Date().getTime(),
    chunkFilename: 'app-bundle-chunk.js?t=' + new Date().getTime(),
    publicPath: './',
    path: path.resolve(__dirname, 'Demo')
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};
