import { Activity } from '@/dto/Activity';

export class UserActivities {
    activities: Activity[];
    hasPrevious: boolean;
    hasNext: boolean;
}
