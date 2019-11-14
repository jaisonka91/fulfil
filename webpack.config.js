module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    port: process.env.PORT || 8080,
    host: "0.0.0.0",
    disableHostCheck: true,
    historyApiFallback: true
  }
};
