import { Component, Prop, Vue } from 'vue-property-decorator';
import { Album } from '@/dto/Album';
import { ApiService } from '@/services/ApiService';


@Component
export default class Thumbnail extends Vue {

    @Prop()
    album: Album;

    private apiService = new ApiService();

    get thumbnailUrl(): string {
        if (this.album) {
            return this.apiService.thumbnailUrl(this.album);
        }
        return null;
    }

}
