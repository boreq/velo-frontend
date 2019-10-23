import { Component, Prop, Vue } from 'vue-property-decorator';
import { Album } from '@/dto/Album';
import { Track } from '@/dto/Track';
import { Entry, Mutation, ReplaceCommand } from '@/store';
import { TextService } from '@/services/TextService';
import Spinner from '@/components/Spinner.vue';


@Component({
    components: {
        Spinner,
    },
})
export default class Tracks extends Vue {

    @Prop()
    tracks: Track[];

    @Prop()
    album: Album;

    private textService = new TextService();

    isNowPlaying(track: Track): boolean {
        const nowPlaying: Entry = this.$store.getters.nowPlaying;
        if (nowPlaying) {
            return track.id === nowPlaying.track.id;
        }
        return false;
    }

    isBeingConverted(track: Track): boolean {
        return !track.duration;
    }

    playTrack(track: Track): void {
        const entries: Entry[] = this.tracks
            .map(t => {
                return {
                    album: this.album,
                    track: t,
                };
            });
        const playingIndex = entries.findIndex(v => v.track === track);
        const command: ReplaceCommand = {
            entries: entries,
            playingIndex: playingIndex,
        };
        this.$store.commit(Mutation.Replace, command);
    }

    formatDuration(track: Track): string {
        return this.textService.formatTime(track.duration);
    }

}
