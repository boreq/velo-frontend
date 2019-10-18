import { Album } from '@/dto/Album';
import axios, { AxiosResponse } from 'axios'; // do not add { }, some webshit bs?
import { Track } from '@/dto/Track';

export class ApiService {

    browse(ids: string[]): Promise<AxiosResponse<Album>> {
        const path = ids.join('/');
        const url = `browse/${path}`;
        return axios.get<Album>(process.env.VUE_APP_API_PREFIX + url);
    }

    trackUrl(track: Track): string {
        const url = `track/${track.id}`;
        return process.env.VUE_APP_API_PREFIX + url;
    }

    thumbnailUrl(album: Album): string {
        const url = `thumbnail/${album.thumbnail.id}`;
        return process.env.VUE_APP_API_PREFIX + url;
    }

}
