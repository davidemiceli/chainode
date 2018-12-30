<template>
  <div class="p-t-80 m-lr-10">
    <h1>Empty {{msg}}</h1>
    <div><a class="btn btn-default" href="#" role="button">Link</a></div>
    <p><i class="fa fa-address-book" aria-hidden="true"></i></p>
  </div>
</template>

<script>
// Routes
import { Routes } from '@/src/router/routes';

export default {
  name: Routes.EMPTY.name,
  data() {
    return {
      msg: 'nothing'
    }
  }
}
</script>
