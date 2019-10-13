import { Component, Vue, Prop } from 'vue-property-decorator';
import { Track } from '@/dto/Track';


@Component
export default class Tracks extends Vue {

    @Prop()
    tracks: Track[];
}
