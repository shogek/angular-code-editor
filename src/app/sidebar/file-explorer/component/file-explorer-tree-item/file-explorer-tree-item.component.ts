import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { getFolderIcon } from "src/app/helpers/icon.helper";
import { Folder } from "../common/folder.model";

// TODO: Sort files and folders by name
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

  public toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
