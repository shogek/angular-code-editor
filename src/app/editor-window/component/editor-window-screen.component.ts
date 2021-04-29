import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { EditorTab } from "src/app/models/editor-tab.model";
import { OnMouseDownArgs } from "../common/on-mouse-down-args";
import { setCaretPosition } from "./editor-line-caret.logic";

@Component({
   selector: 'app-editor-window-screen',
   templateUrl: './editor-window-screen.component.html',
   styleUrls: ['./editor-window-screen.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   // Allows to apply CSS styling to dynamically into the DOM inserted tags.
   encapsulation: ViewEncapsulation.None
})
export class EditorWindowScreenComponent implements AfterViewChecked {
   @Input() set activeTab (value: EditorTab) {
      this._activeTab = value;
      this.activeLine = value.activeLineNumber;
      this.wasTabSwitched = true;
   } get activeTab(): EditorTab { return this._activeTab; }
   @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
   @Output() onMouseDown = new EventEmitter<OnMouseDownArgs>();

   activeLine: number = 1;

   @ViewChild('editor') editor!: ElementRef;

   private wasTabSwitched = false;
   private _activeTab!: EditorTab;
   private lastActiveLine: HTMLParagraphElement | undefined;

   ngAfterViewChecked() {
      if (!this.wasTabSwitched || !this.editor) {
         return;
      } else {
         this.wasTabSwitched = false;
      }

      this.highlightLineAfterTabChanged();
   }

   public onEditorMouseDown(e: MouseEvent) {
      // Using 'setTimeout' will allow the offset to be calculated from the current 'mousedown' instead of the last 'click' event.
      setTimeout(() => {
         this.toggleLineHighlight(this.lastActiveLine);

         const target = e.target as HTMLElement;
         const clickedLine = this.getClickedLineElement(target);
         this.toggleLineHighlight(clickedLine);
         this.lastActiveLine = clickedLine;

         const clickedLineNumber = this.getLineNumber(clickedLine);
         this.activeLine = clickedLineNumber;

         this.onMouseDown.emit({
            clickedLineElementId: target.id,
            clickedLineNumber: clickedLineNumber,
            caretOffset: window.getSelection()?.getRangeAt(0).startOffset!
         });
      });
   }

   public onEditorKeyDown(e: KeyboardEvent) {
      setTimeout(() => {
         console.log(window.getSelection()?.getRangeAt(0).startOffset);

         const { activeLine } = this;
         // TODO: Highlight active line
         if (e.key === 'ArrowUp') {
            if (activeLine > 1) {
               this.activeLine = activeLine - 1;
               console.log((e.target as HTMLElement));
               console.log('ArrowUp', this.activeLine);
            }
         }

         if (e.key === 'ArrowDown') {
            if (activeLine < this.activeTab.lineCount) {
               this.activeLine = activeLine + 1;
               console.log((e.target as HTMLElement));
               console.log('ArrowDown', this.activeLine);
            }
         }

         // this.onKeyDown.emit(e);
      });
   }

   private getClickedLineElement(target: HTMLElement): HTMLParagraphElement {
      const clickedLine = target.nodeName === 'P'
         ? target
         : target.parentElement;

      if (!clickedLine || clickedLine.nodeName !== 'P') {
         debugger;
         throw new Error('Editor line elements should be <p> tags and contain only <span> tags for coloring!');
      }

      return clickedLine as HTMLParagraphElement;
   }

   private toggleLineHighlight(line?: HTMLParagraphElement) {
      if (!line) {
         return;
      }

      const highlight = 'highlight';
      line.classList.contains(highlight)
         ? line.classList.remove(highlight)
         : line.classList.add(highlight);
   }

   private highlightLineAfterTabChanged() {
      const { activeLineElementId, activeLineNumber, caretOffset } = this.activeTab;

      this.activeLine = activeLineNumber;
      console.log('editor', this.activeLine);

      const editor = this.editor.nativeElement as HTMLElement;
      const activeLine = editor.querySelector('#' + activeLineElementId)!;
      setCaretPosition(activeLine, caretOffset);

      const line = this.getClickedLineElement(activeLine as HTMLElement);
      this.toggleLineHighlight(line);
      this.lastActiveLine = line;
   }

   private getLineNumber(line: HTMLParagraphElement): number {
      const editor = this.editor.nativeElement as HTMLElement;
      const allLines = editor.children;
      for (let i = 0; i < allLines.length; i++) {
         if (allLines[i].id === line.id) {
            return i + 1;
         }
      }

      throw new Error('Clicked line not found in the editor?!');
   }
}
