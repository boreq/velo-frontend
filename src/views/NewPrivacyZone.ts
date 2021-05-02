import { Component, Vue, Watch } from 'vue-property-decorator';
import { PrivacyZone } from '@/dto/PrivacyZone';
import { NavigationService } from '@/services/NavigationService';
import { ApiService } from '@/services/ApiService';
import { User } from '@/dto/User';
import Notifications from '@/components/Notifications';

import Spinner from '@/components/Spinner.vue';
import MainHeader from '@/components/MainHeader.vue';
import AppButton from '@/components/forms/AppButton.vue';
import PrivacyZoneForm from '@/components/PrivacyZoneForm.vue';


@Component({
    components: {
        Spinner,
        MainHeader,
        AppButton,
        PrivacyZoneForm,
    },
})
export default class NewPrivacyZone extends Vue {

    zone: PrivacyZone = {
        uuid: 'made-up-uuid',
        name: '',
        circle: {
            center: null,
            radius: 1000,
        },
        position: null,
    };

    working = false;

    private readonly apiService = new ApiService(this);
    private readonly navigationService = new NavigationService(this);

    @Watch('user', {immediate: true})
    onUserChanged(user: User): void {
        if (user === null) {
            this.$router.replace(this.navigationService.getBrowse());
        }
    }

    get formValid(): boolean {
        return !this.formErrors || this.formErrors.length === 0;
    }

    get formErrors(): string[] {
        const errors: string[] = [];

        if (!this.zone.circle.radius) {
            errors.push(`Missing circle radius.`);
        }

        if (!this.zone.circle.center) {
            errors.push(`Missing circle center.`);
        }

        if (!this.zone.position) {
            errors.push(`Missing position.`);
        }

        return errors;
    }

    get user(): User {
        return this.$store.state.user;
    }

    onInput(zone: PrivacyZone): void {
        this.zone = zone;
    }

    submit(): void {
        if (!this.formValid) {
            return;
        }

        this.working = true;

        this.apiService.newPrivacyZone(
            {
                name: this.zone.name,
                position: this.zone.position,
                circle: this.zone.circle,
            },
        ).then(
            () => {
                this.$router.push(
                    this.navigationService.getSettings(),
                );
            },
            error => {
                Notifications.pushError(this, 'Failed to create a new privacy zone.', error);
            },
        ).finally(
            () => {
                this.working = false;
            });
    }

}
