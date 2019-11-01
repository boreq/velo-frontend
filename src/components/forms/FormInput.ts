import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FormInput extends Vue {

    @Prop()
    type: string;

    @Prop()
    placeholder: string;

    @Prop()
    value: any;

}
