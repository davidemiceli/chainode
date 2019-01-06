<template>
  <footer class="footer bg-light" v-if="STORE.uxui.footer">
    <div class="container">
      <span class="text-muted">Just a footer.</span>
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
  },
  methods: {
    Hello: function(e) {
      e.preventDefault();
      // this.$router.push({name: Routes.HOME});
      // toastr.error(Configs.alerts.error);
      toastr.success('Hello!');
    }
  }
}
</script>
