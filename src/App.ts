import { Component, Vue } from 'vue-property-decorator';
import Controls from '@/components/Controls.vue';
import Player from '@/components/Player.vue';
import Errors from '@/components/Errors.vue';
import ConversionStatus from '@/components/ConversionStatus.vue';
import { PlaybackData } from '@/dto/PlaybackData';
import { Mutation } from '@/store';
import { ApiService } from '@/services/ApiService';
import ErrorsClass from '@/components/Errors';


@Component({
    components: {
        Controls,
        Player,
        ConversionStatus,
        Errors,
    },
})
export default class App extends Vue {

    playbackData: PlaybackData = null;

    private readonly apiService = new ApiService(this);

    created() {
        window.addEventListener('keydown', this.onKeyDown);
        this.redirectToSetupIfNeeded();
        this.loadCurrentUser();
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

    private redirectToSetupIfNeeded(): void {
        this.apiService.stats()
            .then(
                response => {
                    if (response.data.users === 0) {
                        this.$router.push({name: 'setup'});
                    }
                },
                () => {
                    ErrorsClass.sendError(this, `Could not confirm whether this instance's setup process was completed.`);
                });
    }

    private loadCurrentUser() {
        this.apiService.refreshCurrentUser()
            .catch(() => {
                ErrorsClass.sendError(this, `Could not retrieve the current user.`);
            });
    }
}
