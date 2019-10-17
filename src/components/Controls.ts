import { Component, Prop, Vue } from 'vue-property-decorator';
import ProgressBar from '@/components/ProgressBar.vue';
import { Entry } from '@/store';
import { PlaybackData } from '@/dto/PlaybackData';
import { TextService } from '@/services/TextService';


@Component({
    components: {
        ProgressBar,
    },
})
export default class Controls extends Vue {

    @Prop()
    playbackData: PlaybackData;

    private textService = new TextService();

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

    get currentTime(): string {
        if (this.playbackData && this.playbackData.currentTime) {
            return this.textService.formatTime(this.playbackData.currentTime);
        }
        return null;
    }

    get duration(): string {
        if (this.playbackData && this.playbackData.duration) {
            return this.textService.formatTime(this.playbackData.duration);
        }
        return null;
    }

    get currentTimePercentage(): number {
        if (this.playbackData && this.playbackData.currentTime && this.playbackData.duration) {
            return this.playbackData.currentTime / this.playbackData.duration;
        }
        return 0;
    }

}
