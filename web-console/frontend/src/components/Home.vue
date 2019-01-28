<template>
  <div class="p-t-80 container">

    <h1 class="title text-center">Peer system statistics</h1>

    <table class="table table-bordered" v-if="Object.keys(STORE.system).length">
      <tbody>
        <tr>
          <td class="text-right"><strong><em>Status</em></strong></td>
          <td>{{STORE.system.status}}</td>
        </tr>
        <tr>
          <td class="text-right"><strong><em>Blockchain</em></strong></td>
          <td>{{STORE.system.peer.blockchain}}</td>
        </tr>
        <tr>
          <td class="text-right"><strong><em>Id</em></strong></td>
          <td>{{STORE.system.peer.id}}</td>
        </tr>
        <tr>
          <td class="text-right"><strong><em>Role</em></strong></td>
          <td>{{STORE.system.peer.role}}</td>
        </tr>
        <tr>
          <td class="text-right"><strong><em>Organization</em></strong></td>
          <td>{{STORE.system.peer.organization}}</td>
        </tr>
        <tr>
          <td class="text-right"><strong><em>Uptime</em></strong></td>
          <td>{{STORE.system.peer.role | timeDuration}}</td>
        </tr>
        <tr>
          <td class="text-right"><strong><em>Used memory</em></strong></td>
          <td>{{STORE.system.system.memoryUsage.heapTotal | formatBytes}}</td>
        </tr>
        <tr>
          <td class="text-right"><strong><em>Free memory</em></strong></td>
          <td>{{STORE.system.system.freemem | formatBytes}} / {{STORE.system.system.mem | formatBytes}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import Configs from '@/src/configs';
import { Routes } from '@/src/router/routes';
import { StatusServices } from '@/src/services/status';
import Store from  '@/src/store/store';
import actions from  '@/src/store/actions';


export default {
  name: Routes.HOME.name,
  data() {
    return {
      STORE: Store
    }
  },
  methods: {
    getStats: function() {
      return StatusServices
        .stats()
        .then(r => {
          actions.SYSTEM_SET(r);
        })
        .catch(err => {
          toastr.error(Configs.alerts.error);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    return next(vm => {
      return vm.getStats();
    });
  }
}
</script>
