import { Component, Vue, Prop } from 'vue-property-decorator';
import { Album } from '@/dto/Album';


@Component
export default class Albums extends Vue {

    @Prop()
    albums: Album[];

    selectAlbum(album: Album): void {
        this.$emit('select-album', album);
    }

}
