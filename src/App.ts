import { Component, Vue } from 'vue-property-decorator';
import Controls from '@/components/Controls.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import Album from '@/components/Album.vue';
import SubHeader from '@/components/SubHeader.vue';
import Songs from '@/components/Songs.vue';


@Component({
    components: {
        Controls,
        ProgressBar,
        Album,
        SubHeader,
        Songs,
    },
})
export default class App extends Vue {
}
