const nodeExternals = require('webpack-node-externals');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.tsx',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    globalObject: 'this',
  },
  externals: [ nodeExternals() ]
});
