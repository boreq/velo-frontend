import { Component, Vue } from 'vue-property-decorator';
import Thumbnail from '@/components/Thumbnail.vue';
import { Entry } from '@/store';
import { NavigationService } from '@/services/NavigationService';


@Component({
    components: {
        Thumbnail,
    },
})
export default class NowPlaying extends Vue {

    private readonly navigationService = new NavigationService(this);

    get nowPlaying(): Entry {
        return this.$store.getters.nowPlaying;
    }

    get trackTitle(): string {
        if (this.nowPlaying && this.nowPlaying.track) {
            return this.nowPlaying.track.title;
        }
        return null;
    }

    get albumTitle(): string {
        if (this.nowPlaying && this.nowPlaying.album) {
            return this.nowPlaying.album.title;
        }
        return null;
    }

    goToNowPlayingSong(): void {
        this.goToNowPlayingAlbum();
    }

    goToNowPlayingAlbum(): void {
        const path = this.navigationService.getBrowseUrl(this.nowPlaying.album);
        this.$router.push({ path: path });
    }

}
