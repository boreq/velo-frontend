import { Component, Vue, Prop } from 'vue-property-decorator';
import { PrivacyZone as PrivacyZoneDto } from '@/dto/PrivacyZone';

import PrivacyZoneMap from '@/components/PrivacyZoneMap.vue';


@Component({
    components: {
        PrivacyZoneMap,
    },
})
export default class PrivacyZone extends Vue {

    @Prop()
    zone: PrivacyZoneDto;

}
