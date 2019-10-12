import { Track } from '@/dto/Track';

export class Album {
    id: string;
    title: string;
    parents: Album[];
    albums: Album[];
    tracks: Track[];
}
