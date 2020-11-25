import { Component, Prop, Vue } from 'vue-property-decorator';
import { Activity } from '@/dto/Activity';
import { NavigationService } from '@/services/NavigationService';
import RouteMap from '@/components/RouteMap.vue';
import { Location } from 'vue-router';


@Component({
    components: {
        RouteMap,
    },
})
export default class ActivityPreview extends Vue {

    @Prop()
    activity: Activity;

    private readonly navigationService = new NavigationService(this);

    get location(): Location {
        if (!this.activity) {
            return null;
        }

        return this.navigationService.getActivity(this.activity.uuid);
    }

}
