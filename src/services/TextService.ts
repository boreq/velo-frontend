export class TextService {

    formatTime(numberOfSeconds: number): string {
        const minutes = Math.floor(numberOfSeconds / 60);
        const seconds = this.pad(Math.floor(numberOfSeconds % 60), 2);
        return `${minutes}:${seconds}`;
    }

    private pad(num: number, size: number): string {
        let s = num.toString();
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }

}
