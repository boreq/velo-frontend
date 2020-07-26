import { Component, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/MainHeader.vue';
import FormInput from '@/components/forms/FormInput.vue';
import AppButton from '@/components/forms/AppButton.vue';
import FileUpload from '@/components/forms/FileUpload.vue';


@Component({
    components: {
        MainHeader,
        FormInput,
        AppButton,
        FileUpload,
    },
})
export default class NewActivity extends Vue {

    working = false;

    get formValid(): boolean {
        return !this.formErrors || this.formErrors.length === 0;
    }

    get formErrors(): string[] {
        const errors = [];

        // if (!this.cmd.username) {
        //     errors.push('Username can not be empty.');
        // }
        //
        // if (!this.cmd.password) {
        //     errors.push('Password can not be empty.');
        // }

        return errors;
    }

    submit(): void {
        if (!this.formValid) {
            return;
        }

        // this.working = true;
    }
}
