import { Component, Vue } from 'vue-property-decorator';

import SettingsAvatar from '@/components/SettingsAvatar.vue';
import SettingsPage from '@/components/SettingsPage.vue';
import SubHeader from '@/components/SubHeader.vue';


@Component({
    components: {
        SettingsAvatar,
        SettingsPage,
        SubHeader,
    },
})
export default class SettingsProfile extends Vue {
}
