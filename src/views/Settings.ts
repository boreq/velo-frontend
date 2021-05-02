import { Component, Vue, Watch } from 'vue-property-decorator';
import { NavigationService } from '@/services/NavigationService';
import { User } from '@/dto/User';

import MainHeader from '@/components/MainHeader.vue';
import SubHeader from '@/components/SubHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import Users from '@/components/Users.vue';
import Invitations from '@/components/Invitations.vue';
import SettingsProfile from '@/components/SettingsProfile.vue';
import SettingsPrivacyZones from '@/components/SettingsPrivacyZones.vue';


@Component({
    components: {
        MainHeader,
        SubHeader,
        FormInput,
        AppButton,
        Users,
        Invitations,
        SettingsProfile,
        SettingsPrivacyZones,
    },
})
export default class Settings extends Vue {

    private readonly navigationService = new NavigationService(this);

    @Watch('user', {immediate: true})
    onUserChanged(user: User): void {
        if (user === null) {
            this.$router.replace(this.navigationService.getBrowse());
        }
    }

    get user(): User {
        return this.$store.state.user;
    }

}
