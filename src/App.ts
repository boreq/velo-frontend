import { Component, Vue } from 'vue-property-decorator';
import Controls from '@/components/Controls.vue';
import Player from '@/components/Player.vue';
import ConversionStatus from '@/components/ConversionStatus.vue';
import { PlaybackData } from '@/dto/PlaybackData';


@Component({
    components: {
        Controls,
        Player,
        ConversionStatus,
    },
})
export default class App extends Vue {

    playbackData: PlaybackData = null;

    onPlaybackData(playbackData: PlaybackData): void {
        this.playbackData = playbackData;
    }

}
