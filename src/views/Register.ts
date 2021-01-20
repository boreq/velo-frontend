import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';
import Notifications from '@/components/Notifications';
import { LoginCommand } from '@/dto/LoginCommand';
import { RegisterCommand } from '@/dto/RegisterCommand';
import { User } from '@/dto/User';

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
export default class Register extends Vue {

    cmd = new RegisterCommand();
    working = false;

    private readonly apiService = new ApiService(this);
    private readonly navigationService = new NavigationService(this);

    private readonly errLogin = `Sign up succeeded but the automatic login failed.`;
    private readonly errSignUp = `Error during the sign up process.`;

    @Watch('user', {immediate: true})
    onUserChanged(user: User): void {
        if (user) {
            this.navigationService.escapeHome();
        }
    }

    get canAttemptToRegister(): boolean {
        return !!this.$route.params.token;
    }

    submit(): void {
        if (!this.formValid) {
            return;
        }

        this.working = true;
        this.cmd.token = this.$route.params.token;
        this.apiService.register(this.cmd)
            .then(
                () => {
                    const loginCommand: LoginCommand = {
                        username: this.cmd.username,
                        password: this.cmd.password,
                    };
                    this.apiService.login(loginCommand)
                        .then(
                            () => {
                                this.working = false;
                                this.navigationService.escapeHome();
                            },
                            error => {
                                this.working = false;
                                Notifications.pushError(this, this.errLogin, error);
                            },
                        );
                },
                error => {
                    this.working = false;
                    Notifications.pushError(this, this.errSignUp, error);
                },
            );
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

}
