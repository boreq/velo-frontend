import { Component, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';

import Spinner from '@/components/Spinner.vue';


@Component({
    components: {
        Spinner,
    },
})
export default class Browse extends Vue {

    private readonly apiService = new ApiService(this);

    @Watch('$route')
    onRouteChanged(): void {
    }

}
