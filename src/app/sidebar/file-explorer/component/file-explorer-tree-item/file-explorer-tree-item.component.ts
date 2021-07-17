import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { getFolderIcon } from "src/app/helpers/icon.helper";
import { UserFile } from "src/app/models/user-file.model";
import { Folder } from "../common/folder.model";

@Component({
  selector: 'app-file-explorer-tree-item',
  templateUrl: './file-explorer-tree-item.component.html',
  styleUrls: ['./file-explorer-tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTreeItem {
  @Input() folder!: Folder;
  @Output() fileClicked = new EventEmitter<string>();
  
  isExpanded = true;
  folderIcon = getFolderIcon();

  public getFolderDepth(folder: Folder) {
    return folder.path.split('/').length;
  }

  public getFileDepth(file: UserFile) {
    return file.path.split('/').slice(0, -1).length;
  }

  public toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  public onFileClicked(userFileId: string) {
    this.fileClicked.emit(userFileId);
  }
}