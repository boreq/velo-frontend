import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import { Album } from '@/dto/Album';
import { ApiService } from '@/services/ApiService';
import Spinner from '@/components/Spinner.vue';


@Component({
    components: {
        Spinner,
    },
})
export default class Thumbnail extends Vue {

    @Prop()
    album: Album;

    @Ref()
    image: HTMLImageElement;

    converting = false;

    private timeoutId: number;

    private apiService = new ApiService();

    get thumbnailUrl(): string {
        if (this.album) {
            return this.apiService.thumbnailUrl(this.album);
        }
        return null;
    }

    onError(event: Event): void {
        this.converting = true;
        this.reload();

    }

    onLoad(event: Event): void {
        this.converting = false;
    }

    private reload() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }
        this.timeoutId = window.setTimeout(() => this.image.src = this.thumbnailUrl, 5000);
    }

}
