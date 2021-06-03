import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { EditorTab } from "src/app/models/editor-tab.model";

@Component({
   selector: 'app-editor-window-screen',
   templateUrl: './editor-window-screen.component.html',
   styleUrls: ['./editor-window-screen.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   // Allows to apply CSS styling to dynamically into the DOM inserted tags.
   encapsulation: ViewEncapsulation.None,
})
export class EditorWindowScreenComponent {
   @Input() activeTab!: EditorTab;
   @Input() activeLine!: number;
   @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
   @Output() onMouseDown = new EventEmitter<MouseEvent>();

   public onEditorMouseDown(e: MouseEvent) {
      this.onMouseDown.emit(e);
   }

   public onEditorKeyDown(e: KeyboardEvent) {
      this.onKeyDown.emit(e);
   }
}
