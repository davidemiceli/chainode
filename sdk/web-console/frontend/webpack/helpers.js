'use strict';
/*
  Webpack helpers
*/

// Move source files as is to another directory
const move_to = (outputPath, files, force=true) => files.map(f => ({from: f, to: outputPath, force: force}));

module.exports = {
  move_to
};
