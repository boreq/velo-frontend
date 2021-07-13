import { Component, Ref, Vue } from 'vue-property-decorator';

@Component
export default class FileUpload extends Vue {

    isDragging = false;
    selectedFile: File = null;

    @Ref('input')
    readonly input: HTMLInputElement;

    onDragover(event: DragEvent): void {
        this.isDragging = true;
        event.preventDefault();
    }

    onDragenter(): void {
        this.isDragging = true;
    }

    onDragleave(): void {
        this.isDragging = false;
    }

    onDragend(): void {
        this.isDragging = false;
    }

    onClick(event: MouseEvent): void {
        event.preventDefault();
        this.input.click();
    }

    onDrop(event: DragEvent): void {
        this.isDragging = false;
        this.handleFiles(event.dataTransfer.files);
    }

    onFileSelect(): void {
        this.handleFiles(this.input.files);
    }

    private handleFiles(files: FileList): void {
        for (const file of files) {
            this.selectedFile = file;
            this.$emit('file', file);
        }
    }

}
