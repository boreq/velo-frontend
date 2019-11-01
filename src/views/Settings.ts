import { Component, Vue, Watch } from 'vue-property-decorator';
import MainHeader from '@/components/MainHeader.vue';
import SubHeader from '@/components/SubHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import ActionBarButton from '@/components/ActionBarButton.vue';
import ActionBar from '@/components/ActionBar.vue';
import { ApiService } from '@/services/ApiService';
import Errors from '@/components/Errors';
import { User } from '@/dto/User';
import Users from '@/components/Users.vue';


@Component({
    components: {
        MainHeader,
        SubHeader,
        FormInput,
        AppButton,
        ActionBar,
        ActionBarButton,
        Users,
    },
})
export default class Settings extends Vue {

    logoutInProgress = false;
    private readonly apiService = new ApiService(this);

    @Watch('user', {immediate: true})
    onUserChanged(user: User): void {
        if (user === null) {
            this.goToBrowse();
        }
    }

    goToBrowse(): void {
        this.$router.push({name: 'browse'});
    }

    logout(): void {
        this.logoutInProgress = true;
        this.apiService.logout()
            .then(
                () => {
                    this.goToBrowse();
                },
                () => {
                    Errors.sendError(this, 'There was an error during the sign out process.');
                },
            )
            .finally(
                () => this.logoutInProgress = false,
            );
    }

    get user(): User {
        return this.$store.state.user;
    }
}
