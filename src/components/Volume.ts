import { Component, Vue } from 'vue-property-decorator';
import { Mutation, SetVolumeCommand } from '@/store';
import ProgressBar from '@/components/ProgressBar.vue';


@Component({
    components: {
        ProgressBar,
    },
})
export default class Volume extends Vue {

    get volume(): number {
        return this.$store.getters.volume;
    }

    get muted(): boolean {
        return this.$store.state.muted;
    }

    toggleMute(): void {
        if (this.$store.state.muted) {
            this.$store.commit(Mutation.Unmute);
        } else {
            this.$store.commit(Mutation.Mute);
        }
    }

    changeVolume(volume: number): void {
        const command: SetVolumeCommand = {
            volume: volume,
        };
        this.$store.commit(Mutation.SetVolume, command);
    }


}
