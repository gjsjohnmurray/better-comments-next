/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *-------------------------------------------------------------------------------------------- */

// @ts-check
'use strict';

const path = require('path');
const webpack = require('webpack');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  context: path.dirname(__dirname),
  mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
  target: 'webworker', // extensions run in a webworker context
  entry: {
    extension: './src/extension.ts',
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.ts', '.js'], // support ts-files and js-files
    alias: {
    },
    fallback: {
      assert: require.resolve('assert'),
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
    },
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
        },
      ],
    }],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  externals: {
    vscode: 'commonjs vscode', // ignored because it doesn't exist
  },
  performance: {
    hints: false,
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../out/web'),
    libraryTarget: 'commonjs',
  },
  devtool: 'nosources-source-map',
};
