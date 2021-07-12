import { Component, Vue, Ref, Watch } from 'vue-property-decorator';
import { User } from '@/dto/User';
import { Location } from 'vue-router';
import { NavigationService } from '@/services/NavigationService';
import { ApiService } from '@/services/ApiService';
import Notifications from '@/components/Notifications';
import { ChangePasswordRequest } from '@/dto/ChangePasswordRequest';

import Spinner from '@/components/Spinner.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';


@Component({
    components: {
        Spinner,
        FormInput,
        AppButton,
    },
})
export default class ChangePassword extends Vue {

    cmd = new ChangePasswordRequest();
    confirmPassword: string = null;

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

        this.apiService.changePassword(this.user.username, this.cmd)
            .then(
                () => {
                    this.load();
                    Notifications.pushSuccess(this, 'Password changed.');
                },
                error => {
                    Notifications.pushError(this, 'Password could not be changed.', error);
                },
            ).finally(
                () => {
                    this.working = false;
                }
            );
    }

    private load(): void {
        this.cmd = new ChangePasswordRequest();
        this.confirmPassword = null;
    }

    get formValid(): boolean {
        return !this.formErrors || this.formErrors.length === 0;
    }

    get formErrors(): string[] {
        const errors = [];

        if (!this.cmd.oldPassword) {
            errors.push('Old password can not be empty.');
        }

        if (!this.cmd.newPassword) {
            errors.push('New password can not be empty.');
        }

        if (this.cmd.newPassword !== this.confirmPassword) {
            errors.push('New password and its confirmation do not match.');
        }


        return errors;
    }

    get user(): User {
        return this.$store.state.user;
    }


}
