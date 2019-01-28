'use strict';

// Requirements
import Vue from 'vue';
import VueRouter from 'vue-router';

// Routes
import { Routes } from '@/src/router/routes';

// Routes
import Home from '@/src/components/Home';
import NotFound from '@/src/components/404';

Vue.use(VueRouter);

const routes = [
  { path: Routes.HOME.path, name: Routes.HOME.name, component: Home},
  { path: Routes.NOTFOUND.path, component: NotFound },
  { path: '*', redirect: Routes.NOTFOUND.path }
];

export default new VueRouter({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  routes: routes
});
