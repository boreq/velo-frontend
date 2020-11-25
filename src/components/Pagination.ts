import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Pagination extends Vue {

    @Prop({default: false})
    hasPrev: boolean;

    @Prop({default: false})
    hasNext: boolean;

}
