import { Album } from '@/dto/Album';
import { Location } from 'vue-router';

export class NavigationService {

    constructor(private vue: any) {
    }

    // todo remove
    getBrowseUrl(album: Album): string {
        const ids: string[] = [];
        if (album.parents) {
            album.parents
                .map(v => v.id)
                .forEach(id => ids.push(id));
        }
        const path = ids.join('/');
        return `/browse/${path}`;
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
