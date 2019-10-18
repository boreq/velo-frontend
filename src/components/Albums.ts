import { Component, Prop, Vue } from 'vue-property-decorator';
import { Album } from '@/dto/Album';
import Thumbnail from '@/components/Thumbnail.vue';


@Component({
    components: {
        Thumbnail,
    },
})
export default class Albums extends Vue {

    @Prop()
    albums: Album[];

    selectAlbum(album: Album): void {
        this.$emit('select-album', album);
    }

}
