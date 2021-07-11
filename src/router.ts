import Vue from 'vue';
import Router from 'vue-router';

import Browse from '@/views/Browse.vue';
import Setup from '@/views/Setup.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import SettingsProfile from '@/views/SettingsProfile.vue';
import SettingsPrivacyZones from '@/views/SettingsPrivacyZones.vue';
import SettingsImport from '@/views/SettingsImport.vue';
import SettingsInstance from '@/views/SettingsInstance.vue';
import Profile from '@/views/Profile.vue';
import NewActivity from '@/views/NewActivity.vue';
import Activity from '@/views/Activity.vue';
import ActivitySettings from '@/views/ActivitySettings.vue';
import NewPrivacyZone from '@/views/NewPrivacyZone.vue';
import PrivacyZoneSettings from '@/views/PrivacyZoneSettings.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/setup',
            name: 'setup',
            component: Setup,
        },
        {
            path: '/settings/profile',
            name: 'settings-profile',
            component: SettingsProfile,
        },
        {
            path: '/settings/privacy-zones',
            name: 'settings-privacy-zones',
            component: SettingsPrivacyZones,
        },
        {
            path: '/settings/import',
            name: 'settings-import',
            component: SettingsImport,
        },
        {
            path: '/settings/instance',
            name: 'settings-instance',
            component: SettingsInstance,
        },
        {
            path: '/settings',
            name: 'settings',
            redirect: {
                name: 'settings-profile',
            }
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
            path: '/activity/:activityUUID/settings',
            name: 'activity-settings',
            component: ActivitySettings,
        },
        {
            path: '/new-privacy-zone',
            name: 'new-privacy-zone',
            component: NewPrivacyZone,
        },
        {
            path: '/privacy-zone/:privacyZoneUUID/settings',
            name: 'privacy-zone-settings',
            component: PrivacyZoneSettings,
        },
        {
            path: '/',
            name: 'browse',
            component: Browse,
        },
        {
            path: '*',
            redirect: {
                name: 'browse',
            }
        },
    ],
});
