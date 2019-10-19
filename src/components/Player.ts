import { Component, Vue, Watch } from 'vue-property-decorator';
import { Entry, Mutation } from '@/store';
import { ApiService } from '@/services/ApiService';
import { PlaybackData } from '@/dto/PlaybackData';


export const seekEvent = 'seek';

@Component({
    components: {},
})
export default class Player extends Vue {

    private apiService = new ApiService();
    private intervalID: number;

    get nowPlaying(): Entry {
        return this.$store.getters.nowPlaying;
    }

    get paused(): boolean {
        return this.$store.state.paused;
    }

    get nowPlayingUrl(): string {
        const entry = this.nowPlaying;
        if (entry) {
            return this.apiService.trackUrl(entry.track);
        }
        return null;
    }

    get audio(): HTMLAudioElement {
        return this.$refs.audio as HTMLAudioElement;
    }

    created(): void {
        this.intervalID = window.setInterval(this.emitValues, 100);
    }

    mounted(): void {
        this.audio.volume = this.volume;
        this.$root.$on(seekEvent, (position: number) => {
            if (this.nowPlaying) {
                this.audio.currentTime = this.audio.duration * position;
            }
        });
    }

    destroyed(): void {
        window.clearInterval(this.intervalID);
    }

    get volume(): number {
        return this.$store.getters.volume;
    }

    @Watch('nowPlaying')
    onNowPlayingChanged(val: number, oldVal: number): void {
        this.audio.src = this.nowPlayingUrl;
        this.play();
    }

    @Watch('paused')
    onPausedChanged(val: boolean, oldVal: boolean): void {
        if (val) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
    }

    @Watch('volume')
    onVolumeChanged(volume: number): void {
        this.audio.volume = volume;
    }

    onEnded(event: Event): void {
        this.$store.commit(Mutation.Next);
    }

    private emitValues(): void {
        if (this.audio) {
            const playbackData: PlaybackData = {
                currentTime: this.audio.currentTime,
                duration: this.audio.duration,
                volume: this.audio.volume,
            };
            this.$emit('playback-data', playbackData);
        }
    }

    private play(): void {
        this.$store.commit(Mutation.Play);
        this.audio.play();
    }


}
