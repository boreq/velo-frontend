import { Component, Vue } from 'vue-property-decorator';
import Album from '@/components/Album.vue';
import SubHeader from '@/components/SubHeader.vue';


@Component({
    components: {
        Album,
        SubHeader,
    },
})
export default class Dashboard extends Vue {
}
