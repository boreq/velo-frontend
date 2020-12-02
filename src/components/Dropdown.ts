import { Component, Vue } from 'vue-property-decorator';


@Component
export default class Dropdown extends Vue {

    isOpen = false;

    open(): void {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

}
