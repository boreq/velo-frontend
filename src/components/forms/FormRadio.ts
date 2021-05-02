import { Component, Prop, Vue, Ref } from 'vue-property-decorator';

import Dropdown from '@/components/Dropdown.vue';
import DropdownElement from '@/components/DropdownElement.vue';

@Component({
    components: {
        Dropdown,
        DropdownElement,
    },
})
export default class FormRadio extends Vue {

    @Prop()
    value: any;

    @Prop()
    values: FormRadioValue[];

    @Ref('dropdown')
    readonly dropdown: Dropdown;

    get currentSelection(): FormRadioValue {
        for (const possibleValue of this.values) {
            if (this.value === possibleValue.value) {
                return possibleValue;
            }
        }

        return null
    }

    select(value: any): void {
        this.$emit('input', value);
        this.dropdown.close();
    }

}

export class FormRadioValue {
    value: string;
    icon: string;
    label: string;
    tooltip: string;
}
