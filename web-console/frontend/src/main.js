'use strict';
/*
  Main application entrypoint
*/

// CSS styles
import '@/src/styles.js';

// Javascript libraries
import 'bootstrap';
import '@fortawesome/fontawesome-free';

// Vue requirements
import Vue from 'vue';
import App from '@/src/components/App';
import router from '@/src/router';
import filters from '@/src/lib/filters';

// Turn off the production tip on the console
Vue.config.productionTip = false;

// App
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
