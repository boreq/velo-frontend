import { Component, Vue, Watch } from 'vue-property-decorator';
import MainHeader from '@/components/MainHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import ActionBarButton from '@/components/ActionBarButton.vue';
import ActionBar from '@/components/ActionBar.vue';
import { CommandLogin } from '@/dto/CommandLogin';
import { User } from '@/dto/User';
import { LoginCommand } from '@/dto/LoginCommand';
import Errors from '@/components/Errors';
import { ApiService } from '@/services/ApiService';


@Component({
    components: {
        MainHeader,
        FormInput,
        AppButton,
        ActionBar,
        ActionBarButton,
    },
})
export default class Login extends Vue {

    cmd = new CommandLogin();
    working = false;

    private readonly apiService = new ApiService(this);

    @Watch('user', {immediate: true})
    onUserChanged(user: User): void {
        if (user) {
            this.goToBrowse();
        }
    }

    submit(): void {
        this.working = true;
        this.apiService.login(this.cmd)
            .then(
                () => {
                    this.goToBrowse();
                },
                error => {
                    if (error.response && error.response.status === 403) {
                        Errors.sendError(this, 'Invalid username or password.');
                    } else {
                        Errors.sendError(this, 'Sign in process could not be completed.');
                    }
                },
            ).finally(
            () => {
                this.working = false;
            });
    }

    goToBrowse(): void {
        this.$router.push({name: 'browse'});
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
