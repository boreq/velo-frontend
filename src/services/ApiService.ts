import { Album } from '@/dto/Album';
import axios, { AxiosResponse } from 'axios'; // do not add { }, some webshit bs?
import { Track } from '@/dto/Track';
import { Stats } from '@/dto/Stats';

export class ApiService {

    browse(ids: string[]): Promise<AxiosResponse<Album>> {
        const path = ids.join('/');
        const url = `browse/${path}`;
        return axios.get<Album>(process.env.VUE_APP_API_PREFIX + url);
    }

    stats(): Promise<AxiosResponse<Stats>> {
        const url = `stats`;
        return axios.get<Stats>(process.env.VUE_APP_API_PREFIX + url);
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
