export class Route {
    uuid: string;
    points: Point[];
    timeMoving: number;
    distance: number;
}

export class Point {
    time: string;
    position: Position;
    altitude: number;
    speed: number;
    cumulativeDistance: number;
}

export class Position {
    latitude: number;
    longitude: number;
}
