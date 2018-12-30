<template>
  <div class="p-t-80 container">

    <h1 class="top-title text-center">Chainode</h1>

    <p class="m-t-50 text-center">
      <img src="/img/image.png" />
    </p>

    <h1 class="m-t-100 title text-center">Lorem ipsum</h1>
    <p class="sentences">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <div class="m-t-50 row">

      <div class="col-md-6">
        <p class="small-title">About something</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br />Here there are some icon examples <i class="material-icons">cloud</i> <i class="material-icons">insert_emoticon</i> of two types.
        </p>
        <p><a class="highlighted-link" href="#">Learn more</a></p>
      </div>

      <div class="col-md-6">
        <p class="small-title">Another section</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br />Here there are some icon examples <i class="material-icons">folder</i> <i class="material-icons">show_chart</i> of two types.
        </p>
        <p><a class="highlighted-link" href="#">Learn more</a></p>
      </div>

    </div>

    <div class="m-t-100 box-section">
      <p class="small-title">Just a box</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>

    <p class="m-t-50 text-center">
      And that all folks!
    </p>

  </div>
</template>

<script>
// Routes
import { Routes } from '@/src/router/routes';

export default {
  name: Routes.HOME.name,
  data() {
    return {
      msg: 'nothing'
    }
  }
}
</script>
