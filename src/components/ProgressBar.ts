import { Component, Prop, Ref, Vue } from 'vue-property-decorator';


@Component
export default class ProgressBar extends Vue {

    @Prop()
    readonly value: number;

    @Ref('progress-bar')
    readonly progressBar: HTMLDivElement;

    private mouseDown = false;

    get percentage(): string {
        if (this.value) {
            return this.value * 100 + '%';
        }
        return '0%';
    }

    onClick(event: MouseEvent): void {
        this.emitValue(event);
    }

    onMouseMove(event: MouseEvent): void {
        if (this.mouseDown) {
            this.emitValue(event);
        }
    }

    onMouseDown(event: MouseEvent): void {
        this.mouseDown = true;
    }

    onMouseUp(event: MouseEvent): void {
        this.mouseDown = false;
    }

    onMouseLeave(event: MouseEvent): void {
        this.mouseDown = false;
    }

    private emitValue(event: MouseEvent): void {
        const value = this.getValue(event);
        this.$emit('value-selected', value);
    }

    private getValue(event: MouseEvent): number {
        const rect = this.progressBar.getBoundingClientRect();
        const x = event.clientX - rect.left;
        return x / rect.width;
    }

}
