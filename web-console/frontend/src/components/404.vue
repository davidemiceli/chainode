<template>
  <div>
    <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data() {
    return {
      msg: 'Sorry, the page you are looking for does not exist.'
    }
  }
}
</script>
