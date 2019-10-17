import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { Album } from '@/dto/Album';
import ProgressBar from '@/components/ProgressBar.vue';
import SubHeader from '@/components/SubHeader.vue';
import Albums from '@/components/Albums.vue';
import Tracks from '@/components/Tracks.vue';


@Component({
    components: {
        ProgressBar,
        Albums,
        SubHeader,
        Tracks,
    },
})
export default class Browse extends Vue {

    album: Album = null;

    private apiService = new ApiService();

    @Watch('$route')
    onRouteChagned(to, from): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    parentUrl(album: Album): string {
        const currentIndex = this.album.parents.indexOf(album);
        const ids = this.album.parents
            .filter((_, index) => index <= currentIndex)
            .map(v => v.id);
        const path = ids.join('/');
        return `/browse/${path}`;
    }

    selectAlbum(album: Album): void {
        const ids = [];
        if (this.album.parents) {
            ids.push(this.album.parents.map(v => v.id));
        }
        ids.push(album.id);
        const path = ids.join('/');
        this.$router.push({ path: `/browse/${path}` });
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

}
