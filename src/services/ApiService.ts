import { Directory } from '@/dto/Directory';
import axios, { AxiosResponse } from 'axios'; // do not add { }, some webshit bs?

export class ApiService {

    browse(ids: string[]): Promise<AxiosResponse<Directory[]>> {
        const path = ids.join('/');
        const url = `browse/${path}`;
        return axios.get<Directory[]>(process.env.VUE_APP_API_PREFIX + url);
    }


}
