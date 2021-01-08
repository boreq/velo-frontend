import { Component, Vue, Ref } from 'vue-property-decorator';
import { User } from '@/dto/User';
import { Location } from 'vue-router';
import { NavigationService } from '@/services/NavigationService';
import { ApiService } from '@/services/ApiService';
import Notifications from '@/components/Notifications';

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

    logoutInProgress = false;

    @Ref('dropdown')
    readonly dropdown: Dropdown;

    private readonly navigationService = new NavigationService(this);
    private readonly apiService = new ApiService(this);

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

    logout(): void {
        this.logoutInProgress = true;
        this.apiService.logout()
            .then(
                () => {
                    this.dropdown.close();
                },
                error => {
                    Notifications.pushError(this, 'There was an error during the sign out process.', error);
                },
            )
            .finally(
                () => this.logoutInProgress = false,
            );
    }


}
