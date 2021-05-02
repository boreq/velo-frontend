import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/dto/User';
import { NavigationService } from '@/services/NavigationService';
import { Location } from 'vue-router';

import CurrentUser from '@/components/CurrentUser.vue';


@Component({
    components: {
        CurrentUser,
    },
})
export default class MainMenu extends Vue {

    private readonly navigationService = new NavigationService(this);

    get user(): User {
        return this.$store.state.user;
    }

    get newActivityLink(): Location {
        return this.navigationService.getNewActivity();
    }

    get profileLink(): Location {
        return this.navigationService.getProfile(this.user.username);
    }

}
