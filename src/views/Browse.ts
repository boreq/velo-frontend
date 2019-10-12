import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { Album } from '@/dto/Album';
import { Track } from '@/dto/Track';
import ProgressBar from '@/components/ProgressBar.vue';
import SubHeader from '@/components/SubHeader.vue';
import Albums from '@/components/Albums.vue';
import Songs from '@/components/Songs.vue';


@Component({
    components: {
        ProgressBar,
        Albums,
        SubHeader,
        Songs,
    },
})
export default class Browse extends Vue {

    private apiService = new ApiService();

    album: Album = null;

    @Watch('$route')
    onRouteChagned(to, from): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    private load(): void {
        const ids = this.extractIds();
        this.apiService.browse(ids)
            .then(response => {
                this.album = response.data;
            });
    }

    private extractIds(): string[] {
        const params  = this.$route.params;
        if (params.pathMatch) {
            return params.pathMatch.split('/');
        }
        return [];
    }

    parentUrl(album: Album): string {
        const currentIndex = this.album.parents.indexOf(album);
        const ids = this.album.parents
            .filter((element, index) => index <= currentIndex)
            .map(album => album.id);
        const path = ids.join('/');
        return `/browse/${path}`;
    }

    selectAlbum(album: Album): void {
        const ids = []
        if (this.album.parents) {
            ids.push(this.album.parents.map(v => v.id));
        }
        ids.push(album.id)
        const path = ids.join('/');
        this.$router.push({ path: `/browse/${path}` })
    }

}
