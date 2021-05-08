import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorer {
  userFiles$ = this.userFileService.getAll();

  constructor (private userFileService: UserFileService) { }

  public onFileClicked(userFileId: string) {
    this.userFileService.setActiveFile(userFileId);
  }
}