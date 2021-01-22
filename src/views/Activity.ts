import { Component, Vue, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import { User } from '@/dto/User';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';
import { Activity as ActivityDto, getActivityTitle } from '@/dto/Activity';
import Notifications from '@/components/Notifications';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderActions from '@/components/MainHeaderActions.vue';
import MainHeaderAction from '@/components/MainHeaderAction.vue';
import RouteMap from '@/components/RouteMap.vue';
import ActivityHeader from '@/components/ActivityHeader.vue';


@Component({
    components: {
        Spinner,
        MainHeader,
        MainHeaderActions,
        MainHeaderAction,
        RouteMap,
        ActivityHeader,
    },
})
export default class Activity extends Vue {

    activityUUID: string = null;
    activity: ActivityDto = null;

    private readonly navigationService = new NavigationService(this);
    private readonly apiService = new ApiService(this);

    get title(): string {
        return getActivityTitle(this.activity);
    }

    get user(): User {
        return this.$store.state.user;
    }

    get activitySettingsLocation(): Location {
        return this.navigationService.getActivitySettings(this.activityUUID);
    }

    get canEditActivity(): boolean {
        return this.user && this.user.username && this.user.username === this.activity.user.username;
    }

    @Watch('$route')
    onRouteChanged(): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    private load(): void {
        this.activityUUID = this.getActivityUUIDFromRoute();
        this.apiService.getActivity(this.activityUUID)
            .then(
                response => {
                    this.activity = response.data;
                },
                error => {
                    Notifications.pushError(this, 'Could not retrieve the activity.', error);
                });
    }

    private getActivityUUIDFromRoute(): string {
        return this.$route.params.activityUUID;
    }

}
