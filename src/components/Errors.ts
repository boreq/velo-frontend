import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class Errors extends Vue {

    static readonly errorEvent = 'eggplant_error';
    private static errorId = 0;

    static sendError(vue: Vue, text: string): void {
        const error: Error = {
            id: this.errorId++,
            created: new Date(),
            text: text,
        };
        vue.$root.$emit(this.errorEvent, error);
    }

    errors: Error[] = [];

    private intervalID: number;

    private readonly visibilityDuration = 10;
    private readonly animationDuration = 2;

    mounted(): void {
        this.$root.$on(Errors.errorEvent, (error: Error) => {
            this.errors.splice(0, 0, error);
        });
        this.intervalID = window.setInterval(this.processErrors, 100);
    }

    destroyed(): void {
        window.clearInterval(this.intervalID);
    }

    shouldHide(error: Error): boolean {
        const secondsDuration = this.duration(new Date(), error.created);
        return secondsDuration > this.visibilityDuration;
    }

    private processErrors(): void {
        this.errors = this.errors.filter(error => {
            const secondsDuration = this.duration(new Date(), error.created);
            return secondsDuration < (this.visibilityDuration + this.animationDuration);
        });
    }

    private duration(a: Date, b: Date): number {
        return (a.getTime() - b.getTime()) / 1000;
    }
}

class Error {
    id: number;
    created: Date;
    text: string;
}
