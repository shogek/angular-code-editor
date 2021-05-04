import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";
import { createFolderTreeStructure } from "./folder.helper";
import { Folder } from "./folder.model";

@Component({
  selector: 'app-sidebar-file-tree-list',
  templateUrl: './sidebar-file-tree-list.component.html',
  styleUrls: ['./sidebar-file-tree-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFileTreeListComponent {
  @Input() set userFiles(value: UserFile[]) {
    this.folder = createFolderTreeStructure(value);
  }
  @Output() fileClicked = new EventEmitter<string>();

  folder!: Folder;
}