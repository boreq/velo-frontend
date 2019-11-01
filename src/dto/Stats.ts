export class Stats {
    conversion: ConversionStats;
    users: number;
}

export class ConversionStats {
    thumbnails: StoreStats;
    tracks: StoreStats;
}

export class StoreStats {
    allItems: number;
    convertedItems: number;
}
