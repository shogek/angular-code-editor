import { ChangeDetectionStrategy, Component, ElementRef, Output, ViewChild, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-welcome-window-screen',
  templateUrl: './welcome-window-screen.component.html',
  styleUrls: ['./welcome-window-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWindowScreenComponent {
  @Output() loadDummyFiles = new EventEmitter<void>();
  @Output() filesDraggedAndDropped = new EventEmitter<FileList>();
  @Output() filesUploaded = new EventEmitter<FileList>();
  @Output() folderUploaded = new EventEmitter<FileList>();

  @ViewChild('fileUploader') fileUploader!: ElementRef;
  @ViewChild('folderUploader') folderUploader!: ElementRef;

  isDragging = false;

  public clickLoadDummyFiles() {
    this.loadDummyFiles.emit();
  }

  public clickFileInput() {
    this.fileUploader.nativeElement.click();
  }

  public clickFolderInput() {
    this.folderUploader.nativeElement.click();
  }

  public dragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = true;
  }

  public dragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = false;
  }

  public drop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragging = false;
    
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      this.filesDraggedAndDropped.emit(e.dataTransfer.files);
    }
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