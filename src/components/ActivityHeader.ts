import { Component, Prop, Vue } from 'vue-property-decorator';
import { Activity, getActivityVisibilityIcon, getActivityVisibilityLabel, getActivityTitle } from '@/dto/Activity';
import { NavigationService } from '@/services/NavigationService';
import { Location } from 'vue-router';
import { dateFilter } from '@/filters';


@Component
export default class ActivityHeader extends Vue {

    @Prop()
    activity: Activity;

    @Prop()
    hideTitle: boolean;

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

    get title(): string {
        return getActivityTitle(this.activity);
    }

    get dateLabel(): string {
        return `Activity started on ${dateFilter(this.activity.timeStarted)} and ended on ${dateFilter(this.activity.timeEnded)}.`;
    }

    get profileLink(): Location {
        return this.navigationService.getProfile(this.activity.user.username);
    }

    get activityLink(): Location {
        return this.navigationService.getActivity(this.activity.uuid);
    }

}
