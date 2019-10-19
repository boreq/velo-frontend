import { Album } from '@/dto/Album';

export class NavigationService {

    getBrowseUrl(album: Album): string {
        const ids: string[] = [];
        if (album.parents) {
            album.parents
                .map(v => v.id)
                .forEach(id => ids.push(id));
        }
        ids.push(album.id);
        const path = ids.join('/');
        return `/browse/${path}`;
    }

}
