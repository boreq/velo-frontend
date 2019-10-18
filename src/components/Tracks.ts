import { Component, Prop, Vue } from 'vue-property-decorator';
import { Album } from '@/dto/Album';
import { Track } from '@/dto/Track';
import { Entry, Mutation, ReplaceCommand } from '@/store';
import { TextService } from '@/services/TextService';


@Component
export default class Tracks extends Vue {

    @Prop()
    tracks: Track[];

    @Prop()
    album: Album;

    private textServce = new TextService();

    get nowPlaying(): Entry {
        return this.$store.getters.nowPlaying;
    }

    isNowPlaying(track: Track): boolean {
        const entry = this.nowPlaying;
        if (entry) {
            return track.id === entry.track.id;
        }
        return false;
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
        return this.textServce.formatTime(track.duration);
    }

}
