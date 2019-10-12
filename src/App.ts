import { Component, Vue } from 'vue-property-decorator';
import Controls from '@/components/Controls.vue';


@Component({
    components: {
        Controls,
    },
})
export default class App extends Vue {
}
