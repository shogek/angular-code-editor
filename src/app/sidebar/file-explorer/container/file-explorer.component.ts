import { ChangeDetectionStrategy, Component } from "@angular/core";
import { EditorTabService } from "src/app/services/editor-tab/editor-tab.service";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorer {
  userFiles$ = this.userFileService.getAll();

  constructor (
    private userFileService: UserFileService,
    private editorTabService: EditorTabService,
  ) { }

  public onFileClicked(userFileId: string) {
    const userFile = this.userFileService.get(userFileId);
    this.editorTabService.openTabFromFile(userFile);
  }
}