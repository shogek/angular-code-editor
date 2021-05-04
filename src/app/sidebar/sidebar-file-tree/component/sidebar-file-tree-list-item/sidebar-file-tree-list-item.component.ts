import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Folder } from "../common/folder.model";

// TODO: Sort files and folders by name
@Component({
  selector: 'app-sidebar-file-tree-list-item',
  templateUrl: './sidebar-file-tree-list-item.component.html',
  styleUrls: ['./sidebar-file-tree-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFileTreeListItemComponent {
  @Input() folder!: Folder;
  @Output() fileClicked = new EventEmitter<string>();
  isExpanded = true;

  public toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
