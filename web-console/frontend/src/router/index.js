'use strict';

// Requirements
import Vue from 'vue';
import VueRouter from 'vue-router';

// Routes
import { Routes } from '@/src/router/routes';

// Routes
import Home from '@/src/components/Home';
import BlocksList from '@/src/components/blocks/List';
import BlocksPropose from '@/src/components/blocks/Propose';
import NotFound from '@/src/components/404';

Vue.use(VueRouter);

const routes = [
  { path: Routes.HOME.path, name: Routes.HOME.name, component: Home},
  { path: Routes.BLOCKS.LIST.path, name: Routes.BLOCKS.LIST.name, component: BlocksList},
  { path: Routes.BLOCKS.PROPOSE.path, name: Routes.BLOCKS.PROPOSE.name, component: BlocksPropose},
  { path: Routes.SOMETHING.path, redirect: Routes.HOME.path },
  { path: Routes.NOTFOUND.path, component: NotFound },
  { path: '*', redirect: Routes.NOTFOUND.path }
];

export default new VueRouter({
  mode: 'history',
  routes: routes
});
