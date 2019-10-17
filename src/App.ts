import { Component, Vue } from 'vue-property-decorator';
import Controls from '@/components/Controls.vue';
import Player from '@/components/Player.vue';


@Component({
    components: {
        Controls,
        Player,
    },
})
export default class App extends Vue {
}
