import { ChangeDetectionStrategy, Component, ElementRef, Output, ViewChild, EventEmitter } from "@angular/core";

// TODO: Add drag and drop

@Component({
  selector: 'app-welcome-window-screen',
  templateUrl: './welcome-window-screen.component.html',
  styleUrls: ['./welcome-window-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWindowScreenComponent {
  @Output() loadDummyFiles = new EventEmitter<void>();
  @Output() filesUploaded = new EventEmitter<FileList>();

  @ViewChild('fileUploader') fileUploader!: ElementRef;
  @ViewChild('folderUploader') folderUploader!: ElementRef;

  public clickLoadDummyFiles() {
    this.loadDummyFiles.emit();
  }

  public clickFileInput() {
    this.fileUploader.nativeElement.click();
  }

  public clickFolderInput() {
    this.folderUploader.nativeElement.click();
  }

  // TODO: Test with uploading files, not folder

  public async onFilesUploaded(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length < 1) {
      debugger;
      throw new Error('How did you manage to cause this?');
    }

    this.filesUploaded.emit(files);
  }
}