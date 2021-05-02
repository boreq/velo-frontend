import { Component, Prop, Vue } from 'vue-property-decorator';

type LabelFunc = (value: number) => string;

@Component
export default class FormSlider extends Vue {

    @Prop()
    min: number;

    @Prop()
    max: number;

    @Prop()
    step: number;

    @Prop()
    value: any;

    @Prop()
    icon: string;

    @Prop()
    label: LabelFunc;

    get labelString(): string {
        if (this.label) {
            return this.label(this.value);
        }

        return this.value;
    }

    get labelLeft(): string {
        const valueRange = this.max - this.min;
        const relativeValue = this.value - this.min;
        return (relativeValue / valueRange * 100) + '%';
    }

    emitValue(event: Event): void {
        this.$emit('input', parseInt(
            (event.target as HTMLInputElement).value,
            10,
        ));
    }

}
