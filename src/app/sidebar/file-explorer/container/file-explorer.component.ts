import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IconService } from "src/app/services/icon/icon-service";
import { UserFileSource } from "src/app/services/user-file/user-file-source";
import { UserFileService } from "src/app/services/user-file/user-file.service";

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerComponent {
  userFiles$ = this.userFileService.getAll();
  chevronDownIcon$ = this.iconService.getChevronDownIcon();
  chevronRightIcon$ = this.iconService.getChevronRightIcon();

  constructor (
    private userFileService: UserFileService,
    private iconService: IconService,
  ) { }

  public onFilesUploaded(files: FileList) {
    this.userFileService.setAll(files, UserFileSource.UploadedFiles);
  }

  public onFolderUploaded(files: FileList) {
    this.userFileService.setAll(files, UserFileSource.UploadedFolder);
  }

  public onFileClicked(userFileId: string) {
    this.userFileService.openFile(userFileId);
  }

  public onFileDelete(userFileId: string) {
    this.userFileService.remove(userFileId);
  }

  public onFolderDelete(folderPath: string) {
    this.userFileService.removeByFolder(folderPath);
  }
}