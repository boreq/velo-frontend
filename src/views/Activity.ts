import { Component, Vue, Watch } from 'vue-property-decorator';
import Spinner from '@/components/Spinner.vue';


@Component({
    components: {
        Spinner,
    },
})
export default class Activity extends Vue {

    forbidden = false;

    // private readonly apiService = new ApiService(this);

    @Watch('$route')
    onRouteChanged(): void {
        this.load();
    }

    created(): void {
        this.load();
    }

    private load(): void {
        const activityUUID = this.getActivityUUIDFromRoute();
        // this.apiService.browse(ids)
        //     .then(
        //         response => {
        //             this.album = response.data;
        //
        //             if (this.album.tracks) {
        //                 const trackAwaitingConversion = this.album.tracks.find(track => !track.duration);
        //                 if (trackAwaitingConversion) {
        //                     this.scheduleTimeout();
        //                 }
        //             }
        //         },
        //         error => {
        //             if (error.response.status === 403) {
        //                 this.forbidden = true;
        //             }
        //             Notifications.pushError(this, 'Could not list the tracks and albums.', error);
        //             this.scheduleTimeout();
        //         });
    }

    private getActivityUUIDFromRoute(): string {
        return this.$route.params.activityUUID;
    }

}
