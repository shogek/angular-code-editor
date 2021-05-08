import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { EditorTab } from "src/app/models/editor-tab.model";
import { EditorTabService } from "src/app/services/editor-tab/editor-tab.service";

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabsComponent {
  @Input() openedTabs: EditorTab[] = [];

  constructor(private editorTabService: EditorTabService) {}

  public handleTabOpen(userFileId: string): void {
    this.editorTabService.setActiveTab(userFileId);
  }

  public handleTabClose(userFileId: string): void {
    this.editorTabService.closeTab(userFileId);
  }
}