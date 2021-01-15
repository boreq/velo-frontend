import { Component, Prop, Vue } from 'vue-property-decorator';
import { Activity, getActivityVisibilityIcon, getActivityVisibilityLabel } from '@/dto/Activity';
import { NavigationService } from '@/services/NavigationService';
import { Location } from 'vue-router';


@Component
export default class ActivityHeader extends Vue {

    @Prop()
    activity: Activity;

    private readonly navigationService = new NavigationService(this);

    get visibilityIcon(): string {
        if (!this.activity || !this.activity.visibility) {
            return '';
        }

        return getActivityVisibilityIcon(this.activity.visibility);
    }

    get visibilityLabel(): string {
        if (!this.activity || !this.activity.visibility) {
            return '';
        }

        return getActivityVisibilityLabel(this.activity.visibility) + '.';
    }

    get profileLink(): Location {
        return this.navigationService.getProfile(this.activity.user.username);
    }

    get activityLink(): Location {
        return this.navigationService.getActivity(this.activity.uuid);
    }

}
