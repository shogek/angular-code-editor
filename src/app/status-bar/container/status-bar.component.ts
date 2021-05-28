import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { EditorTabService } from "src/app/services/editor-tab/editor-tab.service";

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent {
  editorActiveLine$: Observable<number | undefined> = this.editorTabService.getActiveTabLineNumber();
  editorCaretOffset$: Observable<number | undefined> = this.editorTabService.getActiveTabCaretOffset();

  constructor (private editorTabService: EditorTabService) { }
}