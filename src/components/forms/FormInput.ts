import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FormInput extends Vue {

    @Prop()
    type: string;

    @Prop()
    placeholder: string;

    @Prop()
    value: any;

    @Prop()
    maxlength: any;

    @Prop()
    icon: string;

    static idCounter = 0;

    private idNumber: number = FormInput.idCounter++;

    get id(): string {
        return `form-input-${this.idNumber}`
    }

    get isPopulated(): boolean {
        return !!this.value;
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.$emit('submit');
        }
    }

}
