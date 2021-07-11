import { Component, Vue, Watch } from 'vue-property-decorator';
import Notifications from '@/components/Notifications';
import { ImportStravaRequest } from '@/dto/ImportStravaRequest';
import { User } from '@/dto/User';
import { NavigationService } from '@/services/NavigationService';
import { ApiService } from '@/services/ApiService';

import SettingsPage from '@/components/SettingsPage.vue';
import SubHeader from '@/components/SubHeader.vue';
import FileUpload from '@/components/forms/FileUpload.vue';
import AppButton from '@/components/forms/AppButton.vue';

@Component({
    components: {
        SettingsPage,
        SubHeader,
        AppButton,
        FileUpload,
    },
})
export default class SettingsImport extends Vue {
    request: ImportStravaRequest = {
        archive: null,
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

        if (!this.request.archive) {
            errors.push('Strava archive is missing.');
        }

        return errors;
    }

    get user(): User {
        return this.$store.state.user;
    }

    onFile(event: File): void {
        this.request = {
            archive: event,
        };
    }

    submit(): void {
        if (!this.formValid) {
            return;
        }

        this.working = true;

        this.apiService.importStrava(this.request)
            .then(
                () => {
                    Notifications.pushSuccess(this, 'Import successful.');
                    this.$router.push(
                        this.navigationService.getProfile(
                            this.user.username,
                        ),
                    );
                },
                error => {
                    Notifications.pushError(this, 'Import failed.', error);
                },
            ).finally(
            () => {
                this.working = false;
            });
    }
}
