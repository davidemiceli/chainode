'use strict';

// Configurations
import Configs from '@/src/configs';

// Routes
export const Routes = {
  // Dashboard
  HOME: {path: '/', name: 'home'},
  // Blocks
  BLOCKS: {
    LIST: {path: '/dashboard/blocks/list', name: 'BlocksList'},
    PROPOSE: {path: '/dashboard/blocks/propose', name: 'BlocksPropose'}
  },
  // Something
  SOMETHING: {path: '/dashboard/something', name: 'something'},
  // Not Found: 404 error
  NOTFOUND: {path: '/404', name: 'notfound'}
};
