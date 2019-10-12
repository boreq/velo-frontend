import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/browse/*',
            name: 'browse-children',
            component: Dashboard,
        },
        {
            path: '/browse',
            name: 'browse',
            component: Dashboard,
        },
        {
            path: '*',
            redirect: 'browse',
        },
    ],
});
