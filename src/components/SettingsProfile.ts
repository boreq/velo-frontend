import { Component, Vue } from 'vue-property-decorator';

import SettingsAvatar from '@/components/SettingsAvatar.vue';


@Component({
    components: {
        SettingsAvatar,
    },
})
export default class SettingsProfile extends Vue {
}
