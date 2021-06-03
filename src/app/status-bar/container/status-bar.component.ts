import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { EditorTabService } from "src/app/services/editor-tab/editor-tab.service";
import { StatusBarService } from "src/app/services/status-bar/status-bar.service";

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent {
  latestMessage$: Observable<string> = this.statusBarService.getLatestMessage();
  editorActiveLine$: Observable<number | undefined> = this.editorTabService.getActiveTabLineNumber();
  editorCaretOffset$: Observable<number | undefined> = this.editorTabService.getActiveTabCaretOffset();

  constructor (
    private editorTabService: EditorTabService,
    private statusBarService: StatusBarService,
  ) { }
}