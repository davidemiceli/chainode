<template>
  <div v-if="STORE.uxui.loading" class="dashboard-on-loading">
    <div style="padding-top: 10%;">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  </div>
</template>

<script>
// Store
import Store from  '@/src/store/store';

export default {
  name: 'Loading',
  data() {
    return {
      STORE: Store
    }
  }
}
</script>
