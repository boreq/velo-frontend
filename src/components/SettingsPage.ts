import { Component, Vue, Prop } from 'vue-property-decorator';
import { NavigationService } from '@/services/NavigationService';
import { Location } from 'vue-router';

import MainHeader from '@/components/MainHeader.vue';


@Component({
    components: {
        MainHeader,
    },
})
export default class SettingsPage extends Vue {

    @Prop()
    name: string;

    private readonly navigationService = new NavigationService(this);

    get linkProfile(): Location {
        return this.navigationService.getSettingsProfile();
    }

    get linkPrivacyZones(): Location {
        return this.navigationService.getSettingsPrivacyZones();
    }

    get linkInstance(): Location {
        return this.navigationService.getSettingsInstance();
    }

}
