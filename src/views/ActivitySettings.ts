import { Component, Vue, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';
import { Activity as ActivityDto } from '@/dto/Activity';
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
export default class ActivitySettings extends Vue {

    activityUUID: string = null;
    activity: ActivityDto = null;

    private readonly navigationService = new NavigationService(this);
    private readonly apiService = new ApiService(this);

    get activityLocation(): Location {
        return this.navigationService.getActivity(this.activityUUID);
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
