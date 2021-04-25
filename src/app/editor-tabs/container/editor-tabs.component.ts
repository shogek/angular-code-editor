import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabsComponent {
  @Input() allFiles: UserFile[] = [];
  @Input() activeFile!: UserFile;

  constructor(private userFileService: UserFileService) {}

  public handleTabOpen(fileId: string): void {
    this.userFileService.setActiveFile(fileId);
  }

  public handleTabClose(fileId: string): void {
    this.userFileService.removeFile(fileId);
  }
}