<template>
  <div class="p-t-40 container">

    <h1 class="title text-center">Blocks</h1>
    <p class="text-center">
      <small>List of transactions of the ledger.</small>
    </p>

    <p class="text-center" v-if="!STORE.blocks.length">
      There are no blocks...
    </p>

    <ListBlocksPagination class="m-b-15"></ListBlocksPagination>

    <table class="table table-striped table-sm table-small-text" v-if="STORE.blocks.length">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">event_id</th>
          <th scope="col">organization</th>
          <th scope="col">generated_time</th>
          <th scope="col">data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="block in STORE.blocks">
          <td>{{block.id | readMore(10)}}</td>
          <td>{{block.event_id | readMore(10)}}</td>
          <td>{{block.organization | readMore(10)}}</td>
          <td>{{block.generated_time | dateMedium}}</td>
          <td>{{block.data | readMore(20)}}</td>
          <!-- <td>
            <a href="#" v-on:click="Details($event)"><i class="material-icons">visibility</i></a>
          </td> -->
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import Configs from '@/src/configs';
import { Routes } from '@/src/router/routes';
import { BlockServices } from '@/src/services/blocks';
import Store from  '@/src/store/store';
import actions from  '@/src/store/actions';

import ListBlocksPagination from '@/src/components/blocks/pagination/Pagination.vue';

export default {
  name: Routes.BLOCKS.LIST.name,
  components: { ListBlocksPagination },
  data() {
    return {
      STORE: Store
    }
  },
  methods: {
    async List(condition) {
      const loader = this.$loading.show();
      try {
        const r = await BlockServices.list(condition);
        actions.BLOCKS_SET(r);
      } catch(err) {
        console.error(err.stack);
        toastr.error(Configs.alerts.error);
      } finally {
        loader.hide();
      }
    },
    Details(e) {
      return;
    }
  },
  beforeRouteEnter(to, from, next) {
    return next(vm => {
      return vm.List();
    });
  }
}
</script>
