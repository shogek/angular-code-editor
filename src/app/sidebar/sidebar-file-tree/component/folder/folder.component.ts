import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FileTreeNode } from "../sidebar-file-tree-list.component";

// TODO: Rename and move
// TODO: Sort files and folders by name
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderComponent {
  @Input() folder!: FileTreeNode;
  @Output() fileClicked = new EventEmitter<string>();
  isExpanded = true;

  public toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
