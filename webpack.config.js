module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: './main.js'
  },
  module: {
    loaders: [
      {loader: 'jsx-loader' }
    ]
  }
};
