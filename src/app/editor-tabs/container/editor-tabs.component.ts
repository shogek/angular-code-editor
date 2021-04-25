import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { EditorTab } from "src/app/models/editor-tab.model";
import { EditorService } from "src/app/services/editor/editor.service";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabsComponent {
  @Input() allTabs: EditorTab[] = [];
  @Input() activeTab!: EditorTab;

  constructor(private editorService: EditorService) {}

  public handleTabOpen(tabId: string): void {
    this.editorService.openTab(tabId);
  }

  public handleTabClose(tabId: string): void {
    this.editorService.closeTab(tabId);
  }
}