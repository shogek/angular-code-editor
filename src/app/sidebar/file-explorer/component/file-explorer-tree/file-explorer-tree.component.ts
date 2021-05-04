import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";
import { createFolderTreeStructure } from "../common/folder.helper";
import { Folder } from "../common/folder.model";

@Component({
  selector: 'app-file-explorer-tree',
  templateUrl: './file-explorer-tree.component.html',
  styleUrls: ['./file-explorer-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTree {
  @Input() set userFiles(value: UserFile[]) {
    this.folder = createFolderTreeStructure(value);
  }
  @Output() fileClicked = new EventEmitter<string>();

  folder!: Folder;
}