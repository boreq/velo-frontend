import { Component, Vue, Watch } from 'vue-property-decorator';
import { Entry } from '@/store';
import { ApiService } from '@/services/ApiService';
import { PlaybackData } from '@/dto/PlaybackData';


@Component({
    components: {},
})
export default class Player extends Vue {

    private apiService = new ApiService();
    private intervalID: number;

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

    created(): void {
        this.intervalID = window.setInterval(this.emitValues, 100);
    }

    destroyed(): void {
        window.clearInterval(this.intervalID);
    }

    private emitValues(): void {
        const playbackData: PlaybackData = {
            currentTime: this.audio.currentTime,
            duration: this.audio.duration,
            volume: this.audio.volume,
        };
        this.$emit('playback-data', playbackData);
    }

    @Watch('nowPlaying')
    onNowPlayingChanged(val: number, oldVal: number): void {
        this.audio.src = this.nowPlayingUrl;
        this.audio.play();
    }

}
