import { Component, Vue, Watch } from 'vue-property-decorator';
import { User } from '@/dto/User';
import Notifications from '@/components/Notifications';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';
import { LoginCommand } from '@/dto/LoginCommand';

import MainHeader from '@/components/MainHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';


@Component({
    components: {
        MainHeader,
        FormInput,
        AppButton,
    },
})
export default class Login extends Vue {

    cmd = new LoginCommand();
    working = false;

    private readonly apiService = new ApiService(this);
    private readonly navigationService = new NavigationService(this);

    @Watch('user', {immediate: true})
    onUserChanged(user: User): void {
        if (user) {
            this.navigationService.escapeHome();
        }
    }

    submit(): void {
        if (!this.formValid) {
            return;
        }

        this.working = true;
        const next = this.getNext(); // moving this into the promise breaks it for some reason
        this.apiService.login(this.cmd)
            .then(
                () => {
                    if (next) {
                        this.$router.replace({path: next});
                    } else {
                        this.navigationService.escapeHome();
                    }
                },
                error => {
                    Notifications.pushError(this, 'Sign in process could not be completed.', error);
                },
            ).finally(
            () => {
                this.working = false;
            });
    }

    get formValid(): boolean {
        return !this.formErrors || this.formErrors.length === 0;
    }

    get formErrors(): string[] {
        const errors = [];

        if (!this.cmd.username) {
            errors.push('Username can not be empty.');
        }

        if (!this.cmd.password) {
            errors.push('Password can not be empty.');
        }

        return errors;
    }

    get user(): User {
        return this.$store.state.user;
    }

    private getNext(): string {
        const next = this.$route.query.next;
        if (Array.isArray(next)) {
            return next.length > 0 ? next[0] : null;
        }
        return next;
    }

}
