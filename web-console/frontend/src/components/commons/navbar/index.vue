<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light bg-light-white">
    <div class="container">

      <a class="navbar-brand" href="#">
        <img src="/img/logo.png" style="margin-top: -5px; height: 25px; display: inline-block;" />
        <span class="brand-title-name" style="display: inline-block;">CHAINODE</span>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- Left Menu -->
          <li class="nav-item active"><a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></li>
          <li class="nav-item"><a class="nav-link" href="#" v-on:click="Hello($event)">Status</a></li>
          <li class="nav-item"><a class="nav-link" v-bind:href="Routes.HOME.path">Documentation</a></li>
          <li class="nav-item"><a class="nav-link" href="https://github.com/davidemiceli/chainode" target="_blank">Github</a></li>
          <!-- Left Menu -->
        </ul>
        <ul class="navbar-nav mr-right">
          <!-- Right Menu -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <h6 class="dropdown-header">Blocks</h6>
              <a class="dropdown-item" v-bind:href="Routes.BLOCKS.LIST.path">List</a>
              <a class="dropdown-item" v-bind:href="Routes.BLOCKS.PROPOSE.path">Propose</a>
              <div class="dropdown-divider"></div>
              <h6 class="dropdown-header">Admin</h6>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <!-- Right Menu -->
        </ul>

      </div>

    </div>
  </nav>
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
  name: 'Navbar',
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
