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
          <!-- Left Menu -->
        </ul>
        <ul class="navbar-nav mr-right">
          <!-- Right Menu -->
          <li class="nav-item"><a class="nav-link" href="https://github.com/davidemiceli/chainode/blob/develop/README.md" target="_blank">Documentation</a></li>
          <li class="nav-item"><a class="nav-link" href="https://github.com/davidemiceli/chainode" target="_blank"><i class="fab fa-github"></i> Github</a></li>
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
  }
}
</script>
