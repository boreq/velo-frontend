import { Component, Vue } from 'vue-property-decorator';
import ActivityPreviews from '@/components/ActivityPreviews.vue';


@Component({
    components: {
        ActivityPreviews,
    },
})
export default class Profile extends Vue {

}
