import { Component, Vue } from 'vue-property-decorator';
import CurrentUser from '@/components/CurrentUser.vue';


@Component({
    components: {
        CurrentUser,
    },
})
export default class MainMenu extends Vue {

}
