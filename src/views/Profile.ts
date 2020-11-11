import { Component, Vue, Watch } from 'vue-property-decorator';
import ActivityPreviews from '@/components/ActivityPreviews.vue';
import { ApiService } from '@/services/ApiService';
import Notifications from '@/components/Notifications';
import { UserProfile } from '@/dto/UserProfile';
import Spinner from '@/components/Spinner.vue';


@Component({
    components: {
        ActivityPreviews,
        Spinner,
    },
})
export default class Profile extends Vue {

    user: UserProfile = null;

    private readonly apiService = new ApiService(this);

    @Watch('$route')
    onRouteChanged(): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    private load(): void {
        const username = this.getUsernameFromRoute();

        this.apiService.getUser(username)
            .then(
                response => {
                    this.user = response.data;
                },
                error => {
                    Notifications.pushError(this, 'Could not retrieve the user.', error);
                });
    }

    private getUsernameFromRoute(): string {
        return this.$route.params.username;
    }

}
