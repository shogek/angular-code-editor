import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";

@Component({
   selector: 'app-editor-window-screen',
   templateUrl: './editor-window-screen.component.html',
   styleUrls: ['./editor-window-screen.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorWindowScreenComponent {
   @Input() set activeFile(value: UserFile) {
      this.fileContents = value?.contents ?? '';
      this.fileLineCount = value?.contents?.split('\n').length;
   }
   @Input() activeLine = 0;
   @Output() editorClicked = new EventEmitter<HTMLElement>();
   @Output() editorKeyDowned = new EventEmitter<string>();

   fileLineCount = 0;
   fileContents = '';

   public onEditorClick(e: MouseEvent): void {
      this.editorClicked.emit(e.target as HTMLElement);
   }

   public onEditorKeyDown(e: KeyboardEvent): void {
      this.editorKeyDowned.emit(e.key);
   }
}
