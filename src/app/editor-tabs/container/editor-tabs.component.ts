import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { EditorTab } from "src/app/models/editor-tab.model";
import { EditorTabService } from "src/app/services/editor/editor-tab.service";

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabsComponent {
  @Input() allTabs: EditorTab[] = [];
  @Input() activeTab!: EditorTab;

  constructor(private editorTabService: EditorTabService) {}

  public handleTabOpen(tabId: string): void {
    this.editorTabService.openTab(tabId);
  }

  public handleTabClose(tabId: string): void {
    this.editorTabService.closeTab(tabId);
  }
}