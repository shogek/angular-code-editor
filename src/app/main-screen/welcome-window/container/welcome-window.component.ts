import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserFileSource } from "src/app/services/user-file/user-file-source";
import { UserFileService } from "src/app/services/user-file/user-file.service";

@Component({
  selector: 'app-welcome-window',
  templateUrl: './welcome-window.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWindowComponent {
  constructor (private userFileService: UserFileService) { 
    this.userFileService.useDummyFiles();
  }

  public onLoadDummyFiles() {
    this.userFileService.useDummyFiles();
  }

  public onFilesUploaded(fileList: FileList) {
    this.userFileService.setAll(fileList, UserFileSource.UploadedFiles);
  }

  public onFolderUploaded(fileList: FileList) {
    this.userFileService.setAll(fileList, UserFileSource.UploadedFolder);
  }

  public onFilesDraggedAndDropped(fileList: FileList) {
    this.userFileService.setAll(fileList, UserFileSource.DragAndDrop);
  }
}