import { Component, Vue } from 'vue-property-decorator';
import ProgressBar from '@/components/ProgressBar.vue';


@Component({
    components: {
        ProgressBar,
    },
})
export default class Controls extends Vue {
}
