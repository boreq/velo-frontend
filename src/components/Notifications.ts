import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Notifications extends Vue {

    static readonly notificationEvent = 'eggplant_notification';

    static pushError(vue: Vue, text: string): void {
        const notification: Notification = {
            id: this.notificationId++,
            created: new Date(),
            text: text,
        };
        vue.$root.$emit(this.notificationEvent, notification);
    }

    private static notificationId = 0;
    private static readonly visibilityDuration = 10;
    private static readonly animationDuration = 2;

    notifications: Notification[] = [];

    private intervalID: number;

    mounted(): void {
        this.$root.$on(Notifications.notificationEvent, (notification: Notification) => {
            this.notifications.splice(0, 0, notification);
        });
        this.intervalID = window.setInterval(this.processErrors, 100);
    }

    destroyed(): void {
        window.clearInterval(this.intervalID);
    }

    shouldHide(notification: Notification): boolean {
        const secondsDuration = this.duration(new Date(), notification.created);
        return secondsDuration > Notifications.visibilityDuration;
    }

    private processErrors(): void {
        this.notifications = this.notifications.filter(notification => {
            const secondsDuration = this.duration(new Date(), notification.created);
            return secondsDuration < (Notifications.visibilityDuration + Notifications.animationDuration);
        });
    }

    private duration(a: Date, b: Date): number {
        return (a.getTime() - b.getTime()) / 1000;
    }
}

class Notification {
    id: number;
    created: Date;
    text: string;
}
