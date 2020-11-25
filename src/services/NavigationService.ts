import { Album } from '@/dto/Album';
import { Location } from 'vue-router';

export class NavigationService {

    constructor(private vue: any) {
    }

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

    goToActivity(activityUUID: string): void {
        console.log('going to activity', activityUUID);

        this.vue.$router.replace(
            {
                name: 'activity',
                params: {
                    activityUUID: activityUUID,
                },
            },
        );
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

}
