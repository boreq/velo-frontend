import { Route } from '@/dto/Route';
import { User } from '@/dto/User';

export class Activity {
    uuid: string;
    timeStarted: string;
    timeEnded: string;
    route: Route;
    user: User;
}
