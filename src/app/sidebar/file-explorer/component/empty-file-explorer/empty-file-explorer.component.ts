import { ChangeDetectionStrategy, Component, ElementRef, Output, ViewChild, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-empty-file-explorer',
    templateUrl: './empty-file-explorer.component.html',
    styleUrls: ['./empty-file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyFileExplorerComponent {
    @Output() filesUploaded = new EventEmitter<FileList>();
    @Output() folderUploaded = new EventEmitter<FileList>();

    @ViewChild('fileUploader') fileUploader!: ElementRef;
    @ViewChild('folderUploader') folderUploader!: ElementRef;

    public clickFileInput() {
        this.fileUploader.nativeElement.click();
    }
    
    public clickFolderInput() {
        this.folderUploader.nativeElement.click();
    }
    
    public onFilesUploaded(e: Event) {
        const files = (e.target as HTMLInputElement).files;
        if (files?.length && files.length > 0) {
            this.filesUploaded.emit(files);
        }
    }
    
    public onFolderUploaded(e: Event) {
        const files = (e.target as HTMLInputElement).files;
        if (files?.length && files.length > 0) {
            this.folderUploaded.emit(files);
        }
    }
}