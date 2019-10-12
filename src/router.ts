import Vue from 'vue';
import Router from 'vue-router';
import Browse from './views/Browse.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/browse/*',
            name: 'browse-children',
            component: Browse,
        },
        {
            path: '/browse',
            name: 'browse',
            component: Browse,
        },
        {
            path: '*',
            redirect: 'browse',
        },
    ],
});
