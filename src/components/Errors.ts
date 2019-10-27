import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class Errors extends Vue {

    static readonly errorEvent = 'eggplant_error';

    static sendError(vue: Vue, text: string): void {
        const error: Error = {
            id: this.errorId++,
            created: new Date(),
            text: text,
        };
        vue.$root.$emit(this.errorEvent, error);
    }

    private static errorId = 0;
    private static readonly visibilityDuration = 10;
    private static readonly animationDuration = 2;

    errors: Error[] = [];

    private intervalID: number;

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
        return secondsDuration > Errors.visibilityDuration;
    }

    private processErrors(): void {
        this.errors = this.errors.filter(error => {
            const secondsDuration = this.duration(new Date(), error.created);
            return secondsDuration < (Errors.visibilityDuration + Errors.animationDuration);
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
