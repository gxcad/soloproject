const path = require('path');

module.exports = {
  
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer:{
    publicPath: '/build',
    proxy: {
      '/coolRoute': 'http://localhost:3000'
    },
  },
  module: {
    rules: [
      { test: /\.s?css$/i,
        exclude: /node_modules/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/i,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react',]
        },
      },
    ]
  },
}