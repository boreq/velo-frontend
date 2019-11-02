import { Component, Vue } from 'vue-property-decorator';
import { ApiService } from '@/services/ApiService';
import { Stats, StoreStats } from '@/dto/Stats';
import Spinner from '@/components/Spinner.vue';


@Component({
    components: {
        Spinner,
    },
})
export default class ConversionStatus extends Vue {

    stats: Stats = null;

    private timeoutId: number = null;

    private readonly apiService = new ApiService(this);

    created(): void {
        this.update();
    }

    destroyed(): void {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }
    }

    get isConverting(): boolean {
        const thumbnails = this.getThumbnailStats();
        if (thumbnails) {
            if (thumbnails.allItems > thumbnails.convertedItems) {
                return true;
            }
        }

        const tracks = this.getTrackStats();
        if (tracks) {
            if (tracks.allItems > tracks.convertedItems) {
                return true;
            }
        }

        return false;
    }


    get text(): string {
        const text: string[] = [];

        const thumbnails = this.getThumbnailStats();
        if (thumbnails) {
            const percentage = this.getPercentage(thumbnails);
            if (percentage !== null && percentage !== 100) {
                text.push(`Converting thumbnails (${this.getPercentageText(percentage)}).`);
            }
        }

        const tracks = this.getTrackStats();
        if (tracks) {
            const percentage = this.getPercentage(tracks);
            if (percentage !== null && percentage !== 100) {
                text.push(`Converting tracks (${this.getPercentageText(percentage)}).`);
            }
        }

        return text.join(' ');
    }


    private getPercentage(stats: StoreStats): number {
        if (stats.allItems === 0) {
            return null;
        }
        return stats.convertedItems / stats.allItems * 100;
    }

    private getPercentageText(percentage: number): string {
        const text = percentage.toFixed(0);
        return `${text}%`;
    }

    private schedule(): void {
        this.timeoutId = window.setTimeout(this.update, 10000);
    }

    private update(): void {
        this.apiService.stats()
            .then(
                response => {
                    this.stats = response.data;
                    this.schedule();
                },
                () => {
                    this.stats = null;
                    this.schedule();
                });
    }

    private getThumbnailStats(): StoreStats {
        if (this.stats) {
            return this.stats.thumbnails;
        }
        return null;
    }

    private getTrackStats(): StoreStats {
        if (this.stats) {
            return this.stats.tracks;
        }
        return null;
    }

}
