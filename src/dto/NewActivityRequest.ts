import { ActivityVisibility } from '@/dto/Activity';

export class NewActivityRequest {
    title: string;
    routeFile: File;
    visibility: ActivityVisibility;
}
