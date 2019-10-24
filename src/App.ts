import { Component, Vue } from 'vue-property-decorator';
import Controls from '@/components/Controls.vue';
import Player from '@/components/Player.vue';
import ConversionStatus from '@/components/ConversionStatus.vue';
import { PlaybackData } from '@/dto/PlaybackData';
import { Mutation } from '@/store';


@Component({
    components: {
        Controls,
        Player,
        ConversionStatus,
    },
})
export default class App extends Vue {

    playbackData: PlaybackData = null;

    created() {
        window.addEventListener('keydown', this.onKeyDown);
    }

    destroyed(): void {
        window.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Space') {
            if (this.$store.state.paused) {
                this.$store.commit(Mutation.Play);
            } else {
                this.$store.commit(Mutation.Pause);
            }
        }
    }

    onPlaybackData(playbackData: PlaybackData): void {
        this.playbackData = playbackData;
    }

}
