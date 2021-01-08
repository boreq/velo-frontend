import { Component, Vue, Watch } from 'vue-property-decorator';
import Notifications from '@/components/Notifications';
import { ApiService } from '@/services/ApiService';
import { NewActivityRequest } from '@/dto/NewActivityRequest';
import { NavigationService } from '@/services/NavigationService';
import { User } from '@/dto/User';

import MainHeader from '@/components/MainHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import FileUpload from '@/components/forms/FileUpload.vue';


@Component({
    components: {
        MainHeader,
        FormInput,
        AppButton,
        FileUpload,
    },
})
export default class NewActivity extends Vue {

    request = new NewActivityRequest();
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

        if (!this.request.routeFile) {
            errors.push('Route file is missing.');
        }

        return errors;
    }

    get user(): User {
        return this.$store.state.user;
    }

    onFile(event: File): void {
        this.request = {
            title: this.request.title,
            routeFile: event,
        };
    }

    submit(): void {
        if (!this.formValid) {
            return;
        }

        this.working = true;

        this.apiService.newActivity(this.request)
            .then(
                response => {
                    this.$router.push(
                        this.navigationService.getActivity(response.data.activityUUID),
                    );
                },
                error => {
                    Notifications.pushError(this, 'Failed to create a new activity.', error);
                },
            ).finally(
            () => {
                this.working = false;
            });
    }
}
