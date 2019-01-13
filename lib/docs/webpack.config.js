'use strict';
/*
  Webpack configurations
*/

// Requirements
const path = require('path');
const webpack = require('webpack');
const mainConfigs = require('./webpack/configs');

// Entrypoint and bundle path
const entryPoint = './src/main.js';
const rootPath = path.resolve(__dirname, './');
const outputPath = path.resolve(rootPath, '../../docs');


module.exports = (env, argv) => {

  // Define webpack general configs
  const configs = mainConfigs(entryPoint, rootPath, outputPath);

  // When compiling for production we want the app to be uglified.
  if (argv.mode === 'production') {

    // We also add it as a global, the Vue lib needs it to determine if Dev tool should be active or not.
    const DefinePlugin = new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"production"'}
    });
    // Add production plugins
    configs.plugins.push(DefinePlugin);

  } else if (argv.mode === 'development') {

    // Disable minification
    configs.optimization.minimize = false;

  } else {
    throw Error('Invalid mode parameter. Must be production or development.');
  }

  return configs;
};