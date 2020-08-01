import { Component, Vue, Watch } from 'vue-property-decorator';
import Spinner from '@/components/Spinner.vue';
import { ApiService } from '@/services/ApiService';
import { Activity as ActivityDto } from '@/dto/Activity';
import Notifications from '@/components/Notifications';
import MainHeader from '@/components/MainHeader.vue';
import RouteMap from '@/components/RouteMap.vue';


@Component({
    components: {
        Spinner,
        MainHeader,
        RouteMap,
    },
})
export default class Activity extends Vue {

    activity: ActivityDto = null;

    private readonly apiService = new ApiService(this);

    @Watch('$route')
    onRouteChanged(): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    private load(): void {
        const activityUUID = this.getActivityUUIDFromRoute();
        this.apiService.getActivity(activityUUID)
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
