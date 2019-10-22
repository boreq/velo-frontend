export class Stats {
    conversion: ConversionStats;
}

export class ConversionStats {
    thumbnails: StoreStats;
    tracks: StoreStats;
}

export class StoreStats {
    allItems: number;
    convertedItems: number;
}
