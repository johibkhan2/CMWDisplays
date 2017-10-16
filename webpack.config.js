module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: "dist/bundle.js",
    sourceMapFilename: "dist/bundle.map"
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },{ test: /\.css$/, loader: "style-loader!css-loader" }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
