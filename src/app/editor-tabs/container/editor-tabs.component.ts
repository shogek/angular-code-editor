import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { UserFile } from "src/models/user-file.model";

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabsComponent {
  @Input() userFiles: UserFile[] = [];

  /** Name of the file which is currently active. */
  activeFile = '';

  public tabClicked(fileName: string): void {
    this.activeFile = fileName;
  }
}