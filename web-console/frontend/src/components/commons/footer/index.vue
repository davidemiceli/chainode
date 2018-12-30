<template>
  <footer class="footer bg-light">
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
import stores from  '@/src/store/stores';
import actions from  '@/src/store/actions';

export default {
  name: 'Footer',
  data() {
    return {
      shared: stores,
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
