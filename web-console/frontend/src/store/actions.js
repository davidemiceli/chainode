'use strict';

// Store
import Store from '@/src/store/store';

// Actions
class Actions {

  constructor() { }

  // Loading actions
  LOADING_START() {
    Store.uxui.loading = true;
  }
  LOADING_STOP() {
    Store.uxui.loading = false;
  }

  // Navbar actions
  NAVBAR_SHOW() {
    Store.uxui.navbar = true;
  }
  NAVBAR_HIDE() {
    Store.uxui.navbar = false;
  }

  // Footer actions
  FOOTER_SHOW() {
    Store.uxui.footer = true;
  }
  FOOTER_HIDE() {
    Store.uxui.footer = false;
  }

  // Block actions
  BLOCKS_SET(items) {
    Store.blocks = items;
  }

};

export default new Actions();
