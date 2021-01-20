import { Component, Vue, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import { ApiService } from '@/services/ApiService';
import { NavigationService } from '@/services/NavigationService';
import { Activity as ActivityDto } from '@/dto/Activity';
import Notifications from '@/components/Notifications';
import { ActivityVisibility, ActivityVisibilityIcon } from '@/dto/Activity';

import MainHeader from '@/components/MainHeader.vue';
import SubHeader from '@/components/SubHeader.vue';
import MainHeaderActions from '@/components/MainHeaderActions.vue';
import MainHeaderAction from '@/components/MainHeaderAction.vue';
import RouteMap from '@/components/RouteMap.vue';
import ActivityHeader from '@/components/ActivityHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import FormRadio from '@/components/forms/FormRadio.vue';


@Component({
    components: {
        Spinner,
        MainHeader,
        SubHeader,
        MainHeaderActions,
        MainHeaderAction,
        RouteMap,
        ActivityHeader,
        FormInput,
        FormRadio,
        AppButton,
    },
})
export default class ActivitySettings extends Vue {

    activityUUID: string = null;
    activity: ActivityDto = null;

    visibilityValues: FormRadioValue[] = [
        {
            value: ActivityVisibility.Public,
            icon: ActivityVisibilityIcon.Public,
            label: 'Public',
            tooltip: 'This activity will be publicly visible.',
        },
        {
            value: ActivityVisibility.Unlisted,
            icon: ActivityVisibilityIcon.Unlisted,
            label: 'Unlisted',
            tooltip: 'This activity will not be hidden but accessible via a direct link.',
        },
        {
            value: ActivityVisibility.Private,
            icon: ActivityVisibilityIcon.Private,
            label: 'Private',
            tooltip: 'This activity will be visible only to you.',
        },
    ];

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
