export class Route {
    uuid: string;
    points: Point[];
}

export class Point {
    time: string;
    position: Position;
    altitude: number;
}

export class Position {
    latitude: number;
    longitude: number;
}
