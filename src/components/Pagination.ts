import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Pagination extends Vue {

    @Prop({default: false})
    hasPrevious: boolean;

    @Prop({default: false})
    hasNext: boolean;

}
