import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { getFolderIcon } from "src/app/helpers/icon.helper";
import { Folder } from "src/app/models/folder.model";
import { UserFile } from "src/app/models/user-file.model";
import { createFolderTreeStructure } from "../common/folder.helper";
// import { Folder } from "../common/folder.model";

// TODO: Show all kinds of text in file explorer if no files loaded

@Component({
  selector: 'app-file-explorer-tree',
  templateUrl: './file-explorer-tree.component.html',
  styleUrls: ['./file-explorer-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTree {
  private _userFolders: Folder[] = [];
  @Input() set userFolders(value: Folder[]) {
    this.root = value[0];
    this.rootChildren = value.slice(1);
    this._userFolders = value;
  }
  get userFolders(): Folder[] {
    return this._userFolders;
  }
  // @Input() set userFiles(value: UserFile[]) {
  //   this.folder = createFolderTreeStructure(value);
  // }
  @Output() fileClicked = new EventEmitter<string>();

  root!: Folder;
  rootChildren: Folder[] = [];
  folderIcon = getFolderIcon();

  // folder!: Folder;

  public onFileClicked = (userFileId: string) => {
    this.fileClicked.emit(userFileId);
  }
}