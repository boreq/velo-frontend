import { Component, Prop, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';


@Component
export default class Pagination extends Vue {

    @Prop()
    previous: Location;

    @Prop()
    next: Location;

}
