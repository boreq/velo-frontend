import { Album } from '@/dto/Album';
import axios, { AxiosResponse } from 'axios'; // do not add { }, some webshit bs?

export class ApiService {

    browse(ids: string[]): Promise<AxiosResponse<Album>> {
        const path = ids.join('/');
        const url = `browse/${path}`;
        return axios.get<Album>(process.env.VUE_APP_API_PREFIX + url);
    }


}
