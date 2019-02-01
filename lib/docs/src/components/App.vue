<template>
  <div id="app">
    <navbar />
    <router-view />
    <footerBottom />
  </div>
</template>

<script>

// Components
import navbar from '@/src/components/commons/navbar/index';
import footer from '@/src/components/commons/footer/index';

export default {
  name: 'App',
  components: {
    'navbar': navbar,
    'footerBottom': footer
  }
}

</script>
