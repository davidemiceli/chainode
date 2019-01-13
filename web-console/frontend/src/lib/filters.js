'use strict';

// Requirements
import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter';


// Format currency
Vue.use(VueCurrencyFilter, {
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false
});

// Format a datetime
Vue.filter('dateMedium', function(datetime, format) {
  // return moment(datetime).format(format || 'YYYY-MM-DD hh:mm:ss');
  return moment(datetime).format(format || 'LLL');
});

// Format a time duration
Vue.filter('timeDuration', function(duration) {
  return new moment.duration(duration).humanize();
});

// Format bytes in a readable way
Vue.filter('formatBytes', function(bytes) {
  if (bytes < 1024) return bytes + " Bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
  return (bytes / 1073741824).toFixed(3) + " GB";
});

// Shortify a string if is longer than a defined length
Vue.filter('readMore', function(text, length, suffix) {
  suffix = (text.length <= length) ? '' : (suffix || '…');
  return text.substring(0, length) + suffix;
});

export {}
