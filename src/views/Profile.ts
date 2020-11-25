import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';
import Notifications from '@/components/Notifications';
import { UserProfile } from '@/dto/UserProfile';
import { UserActivities } from '@/dto/UserActivities';
import { Location } from 'vue-router';

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
    private readonly navigationService = new NavigationService(this);

    @Watch('$route')
    onRouteChanged(): void {
        console.log(this.$route);
        this.load();
    }

    created(): void {
        this.load();
    }

    get previous(): Location {
        if (!this.activities || !this.activities.hasPrevious) {
            return null;
        }

        return this.navigationService.getProfileWithBefore(
            this.getUsernameFromRoute(),
            this.activities.activities[0].uuid,
        );
    }

    get next(): Location {
        if (!this.activities || !this.activities.hasNext) {
            return null;
        }

        return this.navigationService.getProfileWithAfter(
            this.getUsernameFromRoute(),
            this.activities.activities[this.activities.activities.length - 1].uuid,
        );
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
