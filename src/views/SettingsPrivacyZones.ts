import { Component, Vue, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import { NavigationService } from '@/services/NavigationService';
import { PrivacyZone as PrivacyZoneDto } from '@/dto/PrivacyZone';
import { User } from '@/dto/User';
import { ApiService } from '@/services/ApiService';
import Notifications from '@/components/Notifications';

import SubHeader from '@/components/SubHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import SettingsAvatar from '@/components/SettingsAvatar.vue';
import WarningAlert from '@/components/alerts/WarningAlert.vue';
import PrivacyZone from '@/components/PrivacyZone.vue';
import Spinner from '@/components/Spinner.vue';
import SettingsPage from '@/components/SettingsPage.vue';


@Component({
    components: {
        SubHeader,
        FormInput,
        AppButton,
        SettingsAvatar,
        WarningAlert,
        PrivacyZone,
        Spinner,
        SettingsPage,
    },
})
export default class SettingsPrivacyZones extends Vue {

    privacyZones: PrivacyZoneDto[] = null;

    private readonly navigationService = new NavigationService(this);
    private readonly apiService = new ApiService(this);

    @Watch('user', {immediate: true})
    onUserChanged(user: User): void {
        if (user === null) {
            this.$router.replace(this.navigationService.getBrowse());
        }

        if (user) {
            this.loadPrivacyZones(this.user.username);
        }
    }

    get noPrivacyZones(): boolean {
        return this.privacyZones && this.privacyZones.length === 0;
    }

    get loading(): boolean {
        return !this.privacyZones;
    }

    get user(): User {
        return this.$store.state.user;
    }

    zoneSettingsLink(zone: PrivacyZoneDto): Location {
        return this.navigationService.getPrivacyZoneSettings(zone.uuid);
    }

    goToNewPrivacyZone(): void {
        this.$router.push(
            this.navigationService.getNewPrivacyZone(),
        );
    }

    private loadPrivacyZones(username: string): void {
        this.apiService.getUserPrivacyZones(username)
            .then(
                response => {
                    this.privacyZones = response.data;
                },
                error => {
                    Notifications.pushError(this, 'Could not retrieve the privacy zones.', error);
                },
            );
    }


}
