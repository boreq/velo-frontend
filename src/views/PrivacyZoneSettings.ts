import { Component, Vue, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';
import Notifications from '@/components/Notifications';

import MainHeader from '@/components/MainHeader.vue';
import SubHeader from '@/components/SubHeader.vue';
import MainHeaderActions from '@/components/MainHeaderActions.vue';
import MainHeaderAction from '@/components/MainHeaderAction.vue';
import AppButton from '@/components/forms/AppButton.vue';


@Component({
    components: {
        MainHeader,
        SubHeader,
        MainHeaderActions,
        MainHeaderAction,
        AppButton,
    },
})
export default class PrivacyZoneSettings extends Vue {

    privacyZoneUUID: string = null;
    workingDelete = false;
    deletionInitiated = false;

    private readonly navigationService = new NavigationService(this);
    private readonly apiService = new ApiService(this);

    get privacyZonesLink(): Location {
        return this.navigationService.getSettingsPrivacyZones();
    }

    @Watch('$route')
    onRouteChanged(): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    submitDelete(): void {
        this.workingDelete = true;

        this.apiService.deletePrivacyZone(this.privacyZoneUUID)
            .then(
                () => {
                    Notifications.pushSuccess(this, 'Privacy zone deleted.');
                    this.$router.replace(this.navigationService.getSettingsPrivacyZones());
                },
                error => {
                    Notifications.pushError(this, 'Failed to delete the privacy zone.', error);
                },
            ).finally(
            () => {
                this.workingDelete = false;
            });
    }

    cancelDeletion(): void {
        this.deletionInitiated = false;
    }

    initiateDeletion(): void {
        this.deletionInitiated = true;
    }

    private load(): void {
        this.privacyZoneUUID = this.getPrivacyZoneUUIDFromRoute();
    }

    private getPrivacyZoneUUIDFromRoute(): string {
        return this.$route.params.privacyZoneUUID;
    }

}
