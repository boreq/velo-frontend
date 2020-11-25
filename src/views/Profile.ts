import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import Notifications from '@/components/Notifications';
import { UserProfile } from '@/dto/UserProfile';
import { UserActivities } from '@/dto/UserActivities';

import ActivityPreviews from '@/components/ActivityPreviews.vue';
import Pagination from '@/components/Pagination.vue';
import Spinner from '@/components/Spinner.vue';


@Component({
    components: {
        ActivityPreviews,
        Spinner,
        Pagination,
    },
})
export default class Profile extends Vue {

    user: UserProfile = null;
    activities: UserActivities = null;

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

        this.apiService.getUserActivities(username)
            .then(
                response => {
                    this.activities = response.data;
                },
                error => {
                    Notifications.pushError(this, 'Could not retrieve the activities.', error);
                });
    }

    private getUsernameFromRoute(): string {
        return this.$route.params.username;
    }

}
