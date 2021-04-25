import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { EditorTab } from "src/app/models/editor-tab.model";

@Component({
   selector: 'app-editor-window-screen',
   templateUrl: './editor-window-screen.component.html',
   styleUrls: ['./editor-window-screen.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorWindowScreenComponent {
   @Input() activeTab!: EditorTab;
   @Output() editorMouseDown = new EventEmitter<MouseEvent>();
   @Output() editorKeyDown = new EventEmitter<KeyboardEvent>();

   public onEditorMouseDown(e: MouseEvent): void {
      this.editorMouseDown.emit(e);
   }

   public onEditorKeyDown(e: KeyboardEvent): void {
      this.editorKeyDown.emit(e);
   }
}
