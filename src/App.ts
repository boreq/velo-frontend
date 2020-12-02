import { Component, Vue } from 'vue-property-decorator';
import Notifications from '@/components/Notifications.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import { ApiService } from '@/services/ApiService';
import MainMenu from '@/components/MainMenu.vue';


@Component({
    components: {
        Notifications,
        SiteHeader,
        MainMenu,
    },
})
export default class App extends Vue {

    private readonly errCheckSetup = `Could not confirm whether this instance's setup process was completed.`;
    private readonly errCheckUser = `Could not retrieve the current user.`;
    private readonly apiService = new ApiService(this);

    created() {
        this.redirectToSetupIfNeeded();
        this.loadCurrentUser();
    }

    private redirectToSetupIfNeeded(): void {
        this.apiService.setup()
            .then(
                response => {
                    if (!response.data.completed) {
                        this.$router.push({name: 'setup'});
                    }
                },
                error => {
                    Notifications.pushError(this, this.errCheckSetup, error);
                });
    }

    private loadCurrentUser() {
        this.apiService.refreshCurrentUser()
            .catch(error => {
                Notifications.pushError(this, this.errCheckUser, error);
            });
    }
}
