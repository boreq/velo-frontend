export function lengthOfLatitudeDegree(latitude: number): number {
    const rad = (latitude * 3.14) / 180;
    return 111132.92 - 559.82 * Math.cos(2 * rad) + 1.175 * Math.cos(4 * rad) - 0.0023 * Math.cos(6 * rad);
}

export function lengthOfLongitudeDegree(latitude: number): number {
    const rad = (latitude * 3.14) / 180;
    return 111412.84 * Math.cos(rad) - 93.5 * Math.cos(3 * rad) + 0.118 * Math.cos(5 * rad);
}

export function clampLatitude(latitude: number): number {
    if (latitude > 90) {
        return 90;
    }

    if (latitude < -90) {
        return -90;
    }

    return latitude;
}

export function clampLongitude(longitude: number): number {
    while (longitude > 180) {
        longitude -= 180;
    }

    while (longitude < 0) {
        longitude += 180;
    }

    return longitude;
}

export function distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const la1 = lat1 * Math.PI / 180;
    const lo1 = lon1 * Math.PI / 180;
    const la2 = lat2 * Math.PI / 180;
    const lo2 = lon2 * Math.PI / 180;
    const r = 6378100; // Earth radius in meters
    const h = hsin(la2 - la1) + Math.cos(la1) * Math.cos(la2) * hsin(lo2 - lo1);
    return 2 * r * Math.asin(Math.sqrt(h));
}

function hsin(theta: number): number {
    return Math.pow(Math.sin(theta / 2), 2);
}
