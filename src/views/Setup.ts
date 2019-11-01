import { Component, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/MainHeader.vue';
import SubHeader from '@/components/SubHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import { CommandInitialize } from '@/dto/CommandInitialize';
import { ApiService } from '@/services/ApiService';
import Errors from '@/components/Errors';
import { LoginCommand } from '@/dto/LoginCommand';


@Component({
    components: {
        MainHeader,
        SubHeader,
        FormInput,
        AppButton,
    },
})
export default class Setup extends Vue {

    cmd = new CommandInitialize();
    working = false;

    private readonly apiService = new ApiService(this);

    mounted(): void {
        this.redirectAwayIfNeeded();
    }

    submit(): void {
        this.working = true;
        this.apiService.initialize(this.cmd)
            .then(
                () => {
                    const loginCommand: LoginCommand = {username: this.cmd.username, password: this.cmd.password};
                    this.apiService.login(loginCommand)
                        .then(
                            () => {
                                this.$router.push({name: 'browse'});
                            },
                            () => {
                                Errors.sendError(this, 'Initial setup succeeded but the automatic login failed.');
                            },
                        );
                },
                () => {
                    Errors.sendError(this, 'Error performing the initial setup.');
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

    private redirectAwayIfNeeded(): void {
        this.apiService.stats()
            .then(
                response => {
                    if (response.data.users !== 0) {
                        this.$router.push({name: 'browse'});
                    }
                },
                () => {
                    Errors.sendError(this, `Could not confirm whether this instance's setup process was completed.`);
                });
    }
}
