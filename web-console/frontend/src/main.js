'use strict';
/*
  Main application entrypoint
*/

// CSS styles
import '@/src/styles.js';

// Javascript libraries
import 'bootstrap';
import 'lodash';
import '@fortawesome/fontawesome-free';

// Vue requirements
import Vue from 'vue';
import App from '@/src/components/App';
import router from '@/src/router';
import filters from '@/src/lib/filters';
// Import component plugins
import Loading from 'vue-loading-overlay';

// Turn off the production tip on the console
Vue.config.productionTip = false;

// Init loading plugins
Vue.use(Loading,{
  loader: 'bars',
  color: '#ffc107'
});

// App
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
