import { Component, Vue, Watch } from 'vue-property-decorator';
import { Entry } from '@/store';
import { ApiService } from '@/services/ApiService';


@Component({
    components: {},
})
export default class Player extends Vue {

    private apiService = new ApiService();

    get nowPlaying(): Entry {
        return this.$store.getters.nowPlaying;
    }

    get nowPlayingUrl(): string {
        const entry = this.nowPlaying;
        if (entry) {
            return this.apiService.trackUrl(entry.track);
        }
        return null;
    }

    get audio(): HTMLAudioElement {
        return this.$refs['audio'] as HTMLAudioElement;
    }

    @Watch('nowPlaying')
    onNowPlayingChanged(val: number, oldVal: number): void {
        this.audio.src = this.nowPlayingUrl;
        this.audio.play();
    }

}
