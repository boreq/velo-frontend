import { Component, Vue, Ref } from 'vue-property-decorator';
import { User } from '@/dto/User';
import { Location } from 'vue-router';
import { NavigationService } from '@/services/NavigationService';

import Spinner from '@/components/Spinner.vue';
import Dropdown from '@/components/Dropdown.vue';
import DropdownElement from '@/components/DropdownElement.vue';
import DropdownDivider from '@/components/DropdownDivider.vue';


@Component({
    components: {
        Spinner,
        Dropdown,
        DropdownElement,
        DropdownDivider,
    },
})
export default class CurrentUser extends Vue {

    @Ref('dropdown')
    readonly dropdown: Dropdown;

    private readonly navigationService = new NavigationService(this);

    get loading(): boolean {
        return this.user === undefined;
    }

    get user(): User {
        return this.$store.state.user;
    }

    get toProfile(): Location {
        return this.navigationService.getProfile(this.user.username);
    }

    get toSettings(): Location {
        return this.navigationService.getSettings();
    }

    login(): void {
        this.$router.push({name: 'login', query: {next: window.location.pathname}});
    }

    register(): void {
        this.$router.push({name: 'register', query: {next: window.location.pathname}});
    }

    settings(): void {
        this.$router.push({name: 'settings'});
    }

}
