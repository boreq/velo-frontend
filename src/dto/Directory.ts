import { Track } from '@/dto/Track';

export class Directory {
    id: string;
    name: string;
    directories: Directory[];
    tracks: Track[];
}
