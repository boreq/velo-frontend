import { Location } from 'vue-router';

export class NavigationService {

    constructor(private vue: any) {
    }

    escapeHome(): void {
        this.vue.$router.replace(
            {
                name: 'browse',
            },
        );
    }

    getProfileWithBefore(username: string, before: string): Location {
        return {
            name: 'profile',
            params: {
                username: username,
            },
            query: {
                before: before,
            },
        };
    }

    getProfileWithAfter(username: string, after: string): Location {
        return {
            name: 'profile',
            params: {
                username: username,
            },
            query: {
                after: after,
            },
        };
    }

    getActivity(activityUUID: string): Location {
        return {
            name: 'activity',
            params: {
                activityUUID: activityUUID,
            },
        };
    }

}
