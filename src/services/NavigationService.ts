import { Location } from 'vue-router';

export class NavigationService {

    constructor(private vue: any) {
    }

    // todo remove
    escapeHome(): void {
        this.vue.$router.replace(
            {
                name: 'browse',
            },
        );
    }

    getBrowse(): Location {
        return {
            name: 'browse',
        };
    }

    getSettings(): Location {
        return {
            name: 'settings',
        };
    }

    getProfile(username: string): Location {
        return {
            name: 'profile',
            params: {
                username: username,
            },
        };
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
