import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
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
}
