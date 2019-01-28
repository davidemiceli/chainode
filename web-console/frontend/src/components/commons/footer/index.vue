<template>
  <footer class="m-t-40" v-if="STORE.uxui.footer"></footer>
</template>

<script>
// Configurations
import Configs from '@/src/configs';

// Routes
import { Routes } from '@/src/router/routes';

// Stores and actions
import Store from  '@/src/store/store';
import actions from  '@/src/store/actions';

export default {
  name: 'Footer',
  data() {
    return {
      STORE: Store,
      Routes: Routes
    }
  }
}
</script>
