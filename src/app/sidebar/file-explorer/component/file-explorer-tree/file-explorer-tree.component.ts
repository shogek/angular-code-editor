import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { Folder } from "src/app/models/folder.model";

// TODO: Show all kinds of text in file explorer if no files loaded

@Component({
  selector: 'app-file-explorer-tree',
  templateUrl: './file-explorer-tree.component.html',
  styleUrls: ['./file-explorer-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTree {
  @Input() chevronDownIcon!: string;
  @Input() chevronRightIcon!: string;
  @Input() set userFolders(value: Folder[]) {
    this.root = value[0];
    this.rootChildren = value.slice(1);
  }
  @Output() fileClicked = new EventEmitter<string>();

  isOpen = false;
  root!: Folder;
  rootChildren: Folder[] = [];

  public toggleFolder() {
    this.isOpen = !this.isOpen;
  }

  public onFileClicked = (userFileId: string) => {
    this.fileClicked.emit(userFileId);
  }
}