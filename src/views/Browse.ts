import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { Album } from '@/dto/Album';
import SubHeader from '@/components/SubHeader.vue';
import Albums from '@/components/Albums.vue';
import Tracks from '@/components/Tracks.vue';
import Thumbnail from '@/components/Thumbnail.vue';
import NowPlaying from '@/components/NowPlaying.vue';
import Notifications from '@/components/Notifications';
import LoginButton from '@/components/LoginButton.vue';
import SearchInput from '@/components/forms/SearchInput.vue';
import Spinner from '@/components/Spinner.vue';


@Component({
    components: {
        Albums,
        SubHeader,
        Tracks,
        Thumbnail,
        NowPlaying,
        SearchInput,
        LoginButton,
        Spinner,
    },
})
export default class Browse extends Vue {

    album: Album = null;

    forbidden = false;

    private timeoutId: number;

    private readonly apiService = new ApiService(this);

    @Watch('$route')
    onRouteChanged(): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    destroyed(): void {
        this.clearTimeout();
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
        const ids = this.album.parents ? this.album.parents.map(v => v.id) : [];
        ids.push(album.id);
        const path = ids.join('/');
        this.$router.push({path: `/browse/${path}`});
    }

    get noContent(): boolean {
        if (!this.album) {
            return false;
        }

        if (this.album.tracks && this.album.tracks.length > 0) {
            return false;
        }

        if (this.album.albums && this.album.albums.length > 0) {
            return false;
        }

        return true;
    }

    get numberOfTracks(): number {
        if (this.album && this.album.tracks) {
            return this.album.tracks.length;
        }
        return 0;
    }

    get totalDurationMinutes(): number {
        if (this.album && this.album.tracks) {
            return Math.ceil(this.album.tracks.reduce((acc, track) => acc + track.duration, 0) / 60);
        }
        return 0;
    }

    private load(): void {
        this.clearTimeout();
        const ids = this.getIdsFromRoute();
        this.apiService.browse(ids)
            .then(
                response => {
                    this.album = response.data;

                    if (this.album.tracks) {
                        const trackAwaitingConversion = this.album.tracks.find(track => !track.duration);
                        if (trackAwaitingConversion) {
                            this.scheduleTimeout();
                        }
                    }
                },
                error => {
                    if (error.response.status === 403) {
                        this.forbidden = true;
                    }
                    Notifications.pushError(this, 'Could not list the tracks and albums.', error);
                });
    }

    private scheduleTimeout(): void {
        this.clearTimeout();
        this.timeoutId = window.setTimeout(this.load, 5000);
    }

    private clearTimeout(): void {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    private getIdsFromRoute(): string[] {
        const params = this.$route.params;
        if (params.pathMatch) {
            return params.pathMatch.split('/');
        }
        return [];
    }

}
