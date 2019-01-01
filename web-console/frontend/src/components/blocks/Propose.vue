<template>
  <div class="p-t-80 container">

    <h1 class="title text-center">Propose a new block</h1>
    <p class="text-center">
      <small>Compose a new transaction to candidate as block into the ledger.</small>
    </p>

    <form>
      <div class="form-group">
        <textarea class="form-control coding" id="block-proposed" rows="8" v-model="block"></textarea>
      </div>
      <div class="text-right">
        <button type="button" class="btn btn-light" v-on:click="Propose($event)">Propose</button>
      </div>
    </form>

  </div>
</template>

<script>
// Configurations
import Configs from '@/src/configs';
// Routes
import { Routes } from '@/src/router/routes';
import { BlockServices } from '@/src/services/blocks';


// Check if data can be serialized as json
const canBeSerialized = block => {
  try {
    const serialized = JSON.stringify(block);
    JSON.parse(serialized);
    return true;
  } catch(err) {
    return false;
  }
}

export default {
  name: Routes.BLOCKS.PROPOSE.name,
  data() {
    return {
      block: ''
    }
  },
  methods: {
    Propose: function(e) {
      e.preventDefault();
      const block = this.block;
      if (!canBeSerialized(block)) {
        toastr.error('Data is a not valid json.');
        return;
      }
      return BlockServices
        .propose(block)
        .then(r => {
          toastr.success(Configs.alerts.successAdded);
          this.block = '';
          return this.$router.push({name: Routes.BLOCKS.LIST.name});
        })
        .catch(err => {
          toastr.error(Configs.alerts.error);
        });
    }
  }
}
</script>
