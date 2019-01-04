<template>
  <div class="p-t-40 container">

    <h1 class="title text-center">Blocks</h1>
    <p class="text-center">
      <small>List of transactions of the ledger.</small>
    </p>

    <p class="text-center" v-if="!STORE.blocks.length">
      There are no blocks yet...
    </p>

    <table class="table table-striped table-sm" v-if="STORE.blocks.length">
      <thead>
        <tr>
          <th scope="col">hash</th>
          <th scope="col">eventId</th>
          <th scope="col">company</th>
          <th scope="col">proposedTime</th>
          <th scope="col">generatedTime</th>
          <th scope="col">data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="block in STORE.blocks">
          <td>{{block.hash | readMore(10)}}</td>
          <td>{{block.eventId | readMore(10)}}</td>
          <td>{{block.company | readMore(10)}}</td>
          <td>{{block.proposedTime | dateMedium}}</td>
          <td>{{block.generatedTime | dateMedium}}</td>
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


export default {
  name: Routes.BLOCKS.LIST.name,
  data() {
    return {
      STORE: Store
    }
  },
  methods: {
    List: function(e) {
      if (e) e.preventDefault();
      return BlockServices
        .list()
        .then(r => {
          actions.BLOCKS_SET(r);
        })
        .catch(err => {
          toastr.error(Configs.alerts.error);
        });
    },
    Details: function(e) {
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
