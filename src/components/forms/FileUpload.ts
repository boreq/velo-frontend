import { Component, Prop, Ref, Vue } from 'vue-property-decorator';

@Component
export default class FileUpload extends Vue {

    @Prop()
    icon: string;

    isDragging = false;
    selectedFile: File = null;

    @Ref('input')
    readonly input: HTMLInputElement;

    onDragover(event): void {
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

    onClick(event): void {
        event.preventDefault();
        this.input.click();
    }

    onDrop(event): void {
        this.isDragging = false;
        this.handleFiles(event.dataTransfer.files);
    }

    onFileSelect(): void {
        this.handleFiles(this.input.files);
    }

    private handleFiles(files: FileList): void {
        for (const file of files) {
            console.log('Emitting a file', file);
            this.selectedFile = file;
            console.log(this.selectedFile);
            this.$emit('file', file);
        }
    }

}
