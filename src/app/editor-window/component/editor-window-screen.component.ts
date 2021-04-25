import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { EditorTab } from "src/app/models/editor-tab.model";

@Component({
   selector: 'app-editor-window-screen',
   templateUrl: './editor-window-screen.component.html',
   styleUrls: ['./editor-window-screen.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorWindowScreenComponent {
   @Input() activeTab!: EditorTab;
   @Input() activeLine!: number;
   @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
   @Output() onMouseDown = new EventEmitter<MouseEvent>();

   public onEditorMouseDown(e: MouseEvent): void {
      this.onMouseDown.emit(e);
   }

   public onEditorKeyDown(e: KeyboardEvent): void {
   }
}
