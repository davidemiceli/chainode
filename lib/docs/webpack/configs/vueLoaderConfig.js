'use strict';
/*
  Webpack VueJs configurations
*/


module.exports = {
  loaders: {},
  cssSourceMap: false,
  cacheBusting: true,
  transformToRequire: {
    video: ['frontend', 'poster'],
    source: 'frontend',
    img: 'frontend',
    image: 'xlink:href'
  }
};
