'use strict';
/*
  Webpack plugins
*/

// Requirements
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// External files for copy plugin
const externalFiles = require('./externalFiles');


// Webpack plugins
module.exports = (rootPath, outputPath) => {

  // Webpack plugins
  return [
    // This plugin will be removed in the future as it only exists for migration
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new CleanWebpackPlugin(['dist', 'build'], {
      root: rootPath,
      exclude: [], // file to exclude
      verbose: true,
      dry: false
    }),
    // Add npm packages to bundle
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      moment: 'moment',
      toastr: 'toastr'
    }),
    // Copy files as is to another directory
    new CopyWebpackPlugin(
      externalFiles(outputPath)
    ),
    new VueLoaderPlugin(),
    // Extract css to make a separated bundle file
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    // Inject the js and css files
    new HtmlWebpackPlugin({
      inject: true,
      template: `${rootPath}/src/index.html`,
      filename: 'index.html'
    })
  ];

}
