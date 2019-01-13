<template>
  <footer class="footer bg-light" v-if="STORE.uxui.footer">
    <div class="container text-center">
      <span class="text-muted">
        <img src="/img/logo.png" style="margin-top: -5px; height: 20px; display: inline-block;"> © 2017-2019 - 
        Documentation licensed under <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>.
      </span>
    </div>
  </footer>
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
