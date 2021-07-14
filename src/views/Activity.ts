import { Component, Vue, Watch, Ref } from 'vue-property-decorator';
import { Location } from 'vue-router';
import { User } from '@/dto/User';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';
import { Activity as ActivityDto, getActivityTitle } from '@/dto/Activity';
import { Route as RouteDto } from '@/dto/Route';
import Notifications from '@/components/Notifications';

import Spinner from '@/components/Spinner.vue';
import MainHeaderActions from '@/components/MainHeaderActions.vue';
import MainHeaderAction from '@/components/MainHeaderAction.vue';
import RouteMap from '@/components/RouteMap.vue';
import ActivityHeader from '@/components/ActivityHeader.vue';


@Component({
    components: {
        Spinner,
        MainHeaderActions,
        MainHeaderAction,
        RouteMap,
        ActivityHeader,
    },
})
export default class Activity extends Vue {

    activityUUID: string = null;
    activity: ActivityDto = null;

    @Ref('map-wrapper')
    readonly mapWrapperElement: HTMLDivElement;

    private observer: ResizeObserver;

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

    get route(): RouteDto {
        if (this.activity) {
            return this.activity.route;
        }
        return null;
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

    mounted(): void {
        this.observer = new ResizeObserver(() => {
            this.rescaleMap();
        });

        this.observer.observe(this.mapWrapperElement);

        window.addEventListener('resize', () => {
            this.rescaleMap();
        });

        this.rescaleMap();
    }

    beforeDestory(): void {
        this.observer.unobserve(this.mapWrapperElement);
    }

    private load(): void {
        this.activityUUID = this.getActivityUUIDFromRoute();
        this.apiService.getActivity(this.activityUUID)
            .then(
                response => {
                    this.activity = response.data;
                    this.rescaleMap();
                },
                error => {
                    Notifications.pushError(this, 'Could not retrieve the activity.', error);
                });
    }

    private getActivityUUIDFromRoute(): string {
        return this.$route.params.activityUUID;
    }

    private rescaleMap(): void {
        if (!this.mapWrapperElement) {
            return;
        }

        const windowHeight = window.innerHeight;
        const elementBottomX = this.mapWrapperElement.getBoundingClientRect().top - window.scrollY;

        const height = windowHeight - elementBottomX;
        if (height < 500) {
            this.mapWrapperElement.style.height =  500 + 'px';
        } else {
            this.mapWrapperElement.style.height =  height + 'px';
        }
    }

}
