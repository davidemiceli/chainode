'use strict';

// Requirements
import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter';


Vue.use(VueCurrencyFilter, {
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false
});

Vue.filter('dateMedium', function(datetime, format) {
  // return moment(datetime).format(format || 'YYYY-MM-DD hh:mm:ss');
  return moment(datetime).format(format || 'LLL');
});

// Shortify a string if is longer than a defined length
Vue.filter('readMore', function(text, length, suffix) {
  return text.substring(0, length) + (suffix || '…');
});

export {}
