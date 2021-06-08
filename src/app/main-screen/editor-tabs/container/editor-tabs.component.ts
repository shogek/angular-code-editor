import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { EditorTab } from "src/app/models/editor-tab.model";
import { EditorTabService } from "src/app/services/editor-tab/editor-tab.service";

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabsComponent {
  openedTabs$: Observable<EditorTab[]> = this.editorTabService.getOpenedTabs();

  constructor(private editorTabService: EditorTabService) {}

  public onOpenTab(userFileId: string) {
    this.editorTabService.setActiveTab(userFileId);
  }

  public onCloseTab(userFileId: string) {
    this.editorTabService.closeTab(userFileId);
  }

  public onCloseAllTabs() {
    this.editorTabService.closeAllTabs();
  }

  public onCloseOtherTabs(userFileId: string) {
    this.editorTabService.closeOtherTabs(userFileId);
  }
}