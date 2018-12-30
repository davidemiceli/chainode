<template>
  <div id="app">
    <loading />
    <navbar />
    <router-view />
    <footerBottom />
  </div>
</template>

<script>

// Components
import loading from '@/src/components/commons/loading/index';
import navbar from '@/src/components/commons/navbar/index';
import footer from '@/src/components/commons/footer/index';

export default {
  name: 'App',
  components: {
    'loading': loading,
    'navbar': navbar,
    'footerBottom': footer
  }
}

</script>
