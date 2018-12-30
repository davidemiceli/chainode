'use strict';

// Store
import stores from '@/src/store/stores';

// Actions
class Actions {

  constructor() { }

  // Loading actions
  LOADING_START() {
    stores.uxui.loading = true;
  }
  LOADING_STOP() {
    stores.uxui.loading = false;
  }

  // Navbar actions
  NAVBAR_SHOW() {
    stores.uxui.navbar = true;
  }
  NAVBAR_HIDE() {
    stores.uxui.navbar = false;
  }

  // User actions
  USER_SET(item) {
    stores.user = item;
  }

};

export default new Actions();
