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
   @Output() editorMouseDown = new EventEmitter<MouseEvent>();
   @Output() editorKeyDown = new EventEmitter<KeyboardEvent>();

   fileLineCount = 0;
   fileContents = '';

   public onEditorMouseDown(e: MouseEvent): void {
      this.editorMouseDown.emit(e);
   }

   public onEditorKeyDown(e: KeyboardEvent): void {
      this.editorKeyDown.emit(e);
   }
}
