import { Component, Vue } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { User } from '@/dto/User';
import Notifications from '@/components/Notifications';


@Component
export default class Users extends Vue {

    users: User[] = [];

    private readonly apiService = new ApiService(this);

    mounted(): void {
        this.load();
    }

    private load(): void {
        this.apiService.list()
            .then(
                response => {
                    this.users = response.data;
                },
                () => {
                    Notifications.pushError(this, 'Could not list the user accounts.');
                },
            );
    }

}
