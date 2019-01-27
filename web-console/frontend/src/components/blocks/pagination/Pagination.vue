<template>
  <div class="row" v-if="STORE.blocks.length">

    <div class="col-md-6 text-left">
      <button type="button" class="btn btn-light" @click="goTo(-1)" :disabled="pag <= 0">Previous</button>
    </div>

    <div class="col-md-6 text-right">
      <button type="button" class="btn btn-light" @click="goTo(1)">Next</button>
    </div>

  </div>
</template>

<script>
import Configs from '@/src/configs';
import { Routes } from '@/src/router/routes';
import { BlockServices } from '@/src/services/blocks';
import Store from  '@/src/store/store';
import actions from  '@/src/store/actions';


export default {
  name: 'ListBlocksPagination',
  data() {
    return {
      STORE: Store,
      pag: 0
    }
  },
  methods: {
    async goTo(pag) {
      const loader = this.$loading.show();
      try {
        this.pag += pag;
        this.pag = (this.pag < 0) ? 0 : this.pag;
        const blocksBkc = _.clone(this.STORE.blocks, true);
        await this.$parent.List({pag: this.pag});
        if (this.STORE.blocks.length === 0 && pag > 0 ) {
          this.pag -= pag;
          actions.BLOCKS_SET([]);
          actions.BLOCKS_SET(blocksBkc);
        }
      } catch(err) {
        console.error(err.stack);
        toastr.error(Configs.alerts.error);
      } finally {
        loader.hide();
      }
    }
  }
}
</script>
