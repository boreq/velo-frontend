import { Component, Vue } from 'vue-property-decorator';
import Album from '@/components/Album.vue';
import SubHeader from '@/components/SubHeader.vue';
import Songs from '@/components/Songs.vue';


@Component({
    components: {
        Album,
        SubHeader,
        Songs,
    },
})
export default class Dashboard extends Vue {
}
