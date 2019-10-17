import { Component, Vue, Prop } from 'vue-property-decorator';
import { Album } from '@/dto/Album';
import { Track } from '@/dto/Track';
import { Mutation, Entry, ReplaceCommand } from '@/store';


@Component
export default class Tracks extends Vue {

    @Prop()
    tracks: Track[];

    @Prop()
    album: Album;

    get nowPlaying(): Entry {
        return this.$store.getters.nowPlaying;
    }

    isNowPlaying(track: Track): boolean {
        const entry = this.nowPlaying;
        if (entry) {
            return track === entry.track && this.album === entry.album;
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

}
