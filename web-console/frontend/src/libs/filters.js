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

Vue.filter('date_medium', function(datetime, format) {
  // return moment(datetime).format(format || 'YYYY-MM-DD hh:mm:ss');
  return moment(datetime).format(format || 'LLL');
});

export {}
