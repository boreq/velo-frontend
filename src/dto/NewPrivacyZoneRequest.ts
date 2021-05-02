import { Position } from '@/dto/Route';
import { Circle } from '@/dto/Circle';

export class NewPrivacyZoneRequest {
    name: string;
    position: Position;
    circle: Circle;
}
