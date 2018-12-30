'use strict';
/*
  Webpack files to exports for copy files plugin
*/

// Helpers
const {move_to} = require('./helpers');


// Configurations to copy external files
module.exports = (outputPath) => {
  // External img files
  const imgExtFiles = move_to(`${outputPath}/img/`, [
    'src/img/logo.png',
    'src/img/image.png'
  ]);
  // Favicon
  const icoExtFiles = move_to(`${outputPath}/`, ['src/img/favicon.ico']);
  // Return concatenated in an unique array
  return [
    ...imgExtFiles,
    ...icoExtFiles
  ];
}