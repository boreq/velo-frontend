import { Route } from '@/dto/Route';
import { User } from '@/dto/User';

export class Activity {
    uuid: string;
    timeStarted: string;
    timeEnded: string;
    route: Route;
    user: User;
    visibility: ActivityVisibility;
}

export enum ActivityVisibility {
    Public = 'public',
    Unlisted = 'unlisted',
    Private = 'private',
}

export enum ActivityVisibilityIcon {
    Public = 'fas fa-globe-europe',
    Unlisted = 'fas fa-lock-open',
    Private = 'fas fa-lock',
}

export enum ActivityVisibilityLabel {
    Public = 'Public',
    Unlisted = 'Unlisted',
    Private = 'Private',
}

export function getActivityVisibilityIcon(visibility: ActivityVisibility): string {
    switch (visibility) {
        case ActivityVisibility.Public:
            return ActivityVisibilityIcon.Public;
        case ActivityVisibility.Unlisted:
            return ActivityVisibilityIcon.Unlisted;
        case ActivityVisibility.Private:
            return ActivityVisibilityIcon.Private;
        default:
            return '';
    }
}

export function getActivityVisibilityLabel(visibility: ActivityVisibility): string {
    switch (visibility) {
        case ActivityVisibility.Public:
            return ActivityVisibilityLabel.Public;
        case ActivityVisibility.Unlisted:
            return ActivityVisibilityLabel.Unlisted;
        case ActivityVisibility.Private:
            return ActivityVisibilityLabel.Private;
        default:
            return '';
    }
}
