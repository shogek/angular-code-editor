import { ChangeDetectionStrategy, Component } from "@angular/core";
import { EditorTabService } from "src/app/services/editor-tab/editor-tab.service";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-sidebar-file-tree',
  templateUrl: './sidebar-file-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFileTreeComponent {
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