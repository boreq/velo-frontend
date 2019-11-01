import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/dto/User';


@Component
export default class LoginButton extends Vue {

    get loading(): boolean {
        return this.user === undefined;
    }

    get user(): User {
        return this.$store.state.user;
    }

    login(): void {
        this.$router.push({name: 'login'});
    }

}
