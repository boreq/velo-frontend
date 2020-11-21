import { Component, Prop, Vue } from 'vue-property-decorator';
import { Activity } from '@/dto/Activity';
import RouteMap from '@/components/RouteMap.vue';


@Component({
    components: {
        RouteMap,
    },
})
export default class ActivityPreview extends Vue {

    @Prop()
    activity: Activity;

}
