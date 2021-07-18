import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IconService } from "src/app/services/icon/icon-service";
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

  public onFileClicked(userFileId: string) {
    this.userFileService.openFile(userFileId);
  }
}