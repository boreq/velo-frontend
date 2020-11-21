import { Component, Prop, Vue } from 'vue-property-decorator';
import ActivityPreview from '@/components/ActivityPreview.vue';
import { Activity } from '@/dto/Activity';


@Component({
    components: {
        ActivityPreview,
    },
})
export default class ActivityPreviews extends Vue {

    @Prop()
    activities: Activity[];

}
