import { Component, Vue, Watch } from 'vue-property-decorator';
import Notifications from '@/components/Notifications';
import { UpdateProfileRequest } from '@/dto/UpdateProfileRequest';
import { User } from '@/dto/User';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';

import SettingsPage from '@/components/SettingsPage.vue';
import SubHeader from '@/components/SubHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';


@Component({
    components: {
        SettingsPage,
        SubHeader,
        FormInput,
        AppButton,
    },
})
export default class SettingsProfile extends Vue {

    cmd: UpdateProfileRequest = null;
    working = false;

    private readonly apiService = new ApiService(this);
    private readonly navigationService = new NavigationService(this);

    @Watch('user', {immediate: true})
    onUserChanged(user: User): void {
        if (user === null) {
            this.$router.replace(this.navigationService.getBrowse());
        }
    }

    @Watch('$route')
    onRouteChanged(): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    submit(): void {
        if (!this.formValid) {
            return;
        }

        this.working = true;

        this.apiService.updateProfile(this.user.username, this.cmd)
            .then(
                () => {
                    this.load();
                    Notifications.pushSuccess(this, 'Profile saved.');
                },
                error => {
                    Notifications.pushError(this, 'Sign in process could not be completed.', error);
                },
            ).finally(
                () => {
                    this.working = false;
                }
            );
    }

    private load(): void {
        this.apiService.refreshCurrentUser()
            .then(
                response => {
                    this.cmd = {
                        displayName: response.displayName,
                    };
                },
                error => {
                    Notifications.pushError(this, 'Could not refresh the current user.', error);
                });
    }

    get formValid(): boolean {
        return !this.formErrors || this.formErrors.length === 0;
    }

    get formErrors(): string[] {
        const errors = [];

        if (!this.cmd.displayName) {
            errors.push('Display name can not be empty.');
        }

        if (this.cmd.displayName.length > 100) {
            errors.push('Display name is too long.');
        }

        return errors;
    }

    get user(): User {
        return this.$store.state.user;
    }
}
