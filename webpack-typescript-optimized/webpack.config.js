const path = require('path')
const slsw = require('serverless-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

console.log('Webpack entries:', slsw.lib.entries)

module.exports = {
  mode: 'development',
  entry: slsw.lib.entries,
  target: 'node',
  externals: ['aws-sdk'],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })
  ]
}
