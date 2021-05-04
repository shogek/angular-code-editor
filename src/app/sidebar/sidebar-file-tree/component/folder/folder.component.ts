import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Folder } from "../folder.model";

// TODO: Rename and move
// TODO: Sort files and folders by name
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderComponent {
  @Input() folder!: Folder;
  @Output() fileClicked = new EventEmitter<string>();
  isExpanded = true;

  public toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
