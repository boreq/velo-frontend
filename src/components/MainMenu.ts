import { Component, Vue } from 'vue-property-decorator';
import CurrentUser from '@/components/CurrentUser.vue';
import { User } from '@/dto/User';


@Component({
    components: {
        CurrentUser,
    },
})
export default class MainMenu extends Vue {

    get user(): User {
        return this.$store.state.user;
    }

}
