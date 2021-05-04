import { ChangeDetectionStrategy, Component, ElementRef, Output, ViewChild, EventEmitter } from "@angular/core";
import { getFileIcon } from "src/app/helpers/icon.helper";
import { UserFile } from "src/app/models/user-file.model";

// TODO: Add drag and drop
// TODO: Emit files one by one - dont' wait for all of them to finish

@Component({
  selector: 'app-welcome-window-screen',
  templateUrl: './welcome-window-screen.component.html',
  styleUrls: ['./welcome-window-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWindowScreenComponent {
  @Output() loadDummyFiles = new EventEmitter<void>();
  @Output() filesUploaded = new EventEmitter<UserFile[]>();

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

  public async onFilesUploaded(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length < 1) {
      debugger;
      throw new Error('How did you manage to cause this?');
    }

    // TODO: Move this to container + move File-to-UserFile conversion to userFileService
    const userFiles: UserFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileContents = await this.getFileContent(file);
      const fileExtension = file.name.split('.').pop()!;
      userFiles.push({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        contents: fileContents,
        extension: fileExtension,
        path: (file as any).webkitRelativePath || '',
        iconPath: getFileIcon(fileExtension)
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
}
