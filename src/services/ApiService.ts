import { Album } from '@/dto/Album';
import axios, { AxiosResponse } from 'axios'; // do not add { }, some webshit bs?
import { Track } from '@/dto/Track';
import { Stats } from '@/dto/Stats';
import { CommandInitialize } from '@/dto/CommandInitialize';
import { LoginCommand } from '@/dto/LoginCommand';
import { LoginResponse } from '@/dto/LoginResponse';
import { Mutation } from '@/store';
import { AuthService } from '@/services/AuthService';
import { User } from '@/dto/User';

/*
declare module 'vue-property-decorator' {
    interface Vue {
        $cookie: any;
    }
}
*/

const authTokenHeaderName = 'Access-Token';

export class ApiService {

    private readonly axios = axios.create();
    private readonly authService = new AuthService();

    constructor(private vue: any) {
        this.axios.interceptors.request.use(
            config => {
                const token = this.authService.getToken();
                if (token) {
                    config.headers[authTokenHeaderName] = token;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            },
        );

        this.axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response && error.response.status === 401) {
                    this.authService.clearToken();
                    this.vue.$store.commit(Mutation.SetUser, null);
                }
                return Promise.reject(error);
            });
    }

    browse(ids: string[]): Promise<AxiosResponse<Album>> {
        const path = ids.join('/');
        const url = `browse/${path}`;
        return this.axios.get<Album>(process.env.VUE_APP_API_PREFIX + url);
    }

    stats(): Promise<AxiosResponse<Stats>> {
        const url = `stats`;
        return this.axios.get<Stats>(process.env.VUE_APP_API_PREFIX + url);
    }

    trackUrl(track: Track): string {
        const url = `track/${track.fileId}`;
        return process.env.VUE_APP_API_PREFIX + url;
    }

    thumbnailUrl(album: Album): string {
        const url = `thumbnail/${album.thumbnail.fileId}`;
        return process.env.VUE_APP_API_PREFIX + url;
    }

    initialize(cmd: CommandInitialize): Promise<AxiosResponse<void>> {
        const url = `user/register-initial`;
        return this.axios.post<void>(process.env.VUE_APP_API_PREFIX + url, cmd);
    }

    login(cmd: LoginCommand): Promise<void> {
        const url = `user/login`;
        return new Promise((resolve, reject) => {
            this.axios.post<LoginResponse>(process.env.VUE_APP_API_PREFIX + url, cmd)
                .then(
                    response => {
                        this.authService.storeToken(response.data.token);
                        this.refreshCurrentUser()
                            .then(
                                () => {
                                    resolve();
                                },
                                error => {
                                    reject(error);
                                },
                            );
                    },
                    error => {
                        reject(error);
                    },
                );
        });
    }

    logout(): Promise<void> {
        const url = `user/logout`;
        return new Promise((resolve, reject) => {
            this.axios.post<void>(process.env.VUE_APP_API_PREFIX + url)
                .then(
                    () => {
                        this.authService.clearToken();
                        this.vue.$store.commit(Mutation.SetUser, null);
                        resolve();
                    },
                    error => {
                        reject(error);
                    },
                );
        });
    }

    refreshCurrentUser(): Promise<User> {
        const url = `user`;
        return new Promise((resolve, reject) => {
            this.axios.get<User>(process.env.VUE_APP_API_PREFIX + url)
                .then(
                    response => {
                        this.vue.$store.commit(Mutation.SetUser, response.data);
                        resolve(response.data);
                    },
                    error => {
                        if (error.response && error.response.status === 401) {
                            resolve(null);
                        } else {
                            reject(error);
                        }
                    },
                );
        });
    }


}
