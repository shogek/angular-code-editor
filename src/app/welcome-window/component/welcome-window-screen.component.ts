import { ChangeDetectionStrategy, Component, ElementRef, Output, ViewChild, EventEmitter } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";

@Component({
  selector: 'app-welcome-window-screen',
  templateUrl: './welcome-window-screen.component.html',
  styleUrls: ['./welcome-window-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWindowScreenComponent {
  @Output() loadDummyFiles = new EventEmitter<void>();
  @Output() filesUploaded = new EventEmitter<UserFile[]>();

  @ViewChild('fileUploader') fileUploader!: ElementRef<HTMLInputElement>;
  @ViewChild('folderUploader') folderUploader!: ElementRef<HTMLInputElement>;

  public clickLoadDummyFiles() {
    this.loadDummyFiles.emit();
  }

  public clickFileInput() {
    this.fileUploader.nativeElement.click();
  }

  public async onFilesUploaded(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length < 1) {
      debugger;
      throw new Error('How did you manage to cause this?');
    }

    // TODO: Add loader?
    const userFiles: UserFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileContents = await this.getFileContent(file);
      userFiles.push({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        contents: fileContents,
        extension: file.name.split('.').pop()!
      });
    }

    this.filesUploaded.emit(userFiles);
  }

  private getFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => {
        debugger;
        reject('How did you manage to cause this?');
      }
      reader.readAsText(file);
    });
  }

  public clickFolderInput() {
    this.folderUploader.nativeElement.click();
  }

  public onFolderUploaded(e: any) {
    // TODO: Finish this
  }
}
