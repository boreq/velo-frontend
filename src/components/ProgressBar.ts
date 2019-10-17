import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class ProgressBar extends Vue {

    @Prop()
    value: number;

    get percentage(): string {
        if (this.value) {
            return this.value * 100 + '%';
        }
        return '0%';
    }
}
