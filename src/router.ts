import Vue from 'vue';
import Router from 'vue-router';
import Browse from '@/views/Browse.vue';
import Setup from '@/views/Setup.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Settings from '@/views/Settings.vue';
import Stats from '@/views/Stats.vue';
import Profile from '@/views/Profile.vue';
import NewActivity from '@/views/NewActivity.vue';
import Activity from '@/views/Activity.vue';

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
            path: '/setup',
            name: 'setup',
            component: Setup,
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
        {
            path: '/stats',
            name: 'stats',
            component: Stats,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/register/:token',
            name: 'register-using-invitation',
            component: Register,
        },
        {
            path: '/user/:username',
            name: 'profile',
            component: Profile,
        },
        {
            path: '/new-activity',
            name: 'new-activity',
            component: NewActivity,
        },
        {
            path: '/activity/:activityUUID',
            name: 'activity',
            component: Activity,
        },
        {
            path: '*',
            redirect: 'browse',
        },
    ],
});
