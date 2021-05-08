import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { EditorTab } from "src/app/models/editor-tab.model";
import { EditorTabService } from "src/app/services/editor-tab/editor-tab.service";
import {
   getClickedLine,
   getCaretOffset,
   getActiveLineAfterArrowUp,
   getActiveLineAfterArrowDown,
   getActiveLineAfterArrowLeft,
   getActiveLineAfterArrowRight
} from "./editor-window-component.logic";

@Component({
   selector: 'app-editor-window',
   templateUrl: './editor-window.component.html',
   styleUrls: ['./editor-window.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorWindowComponent implements OnInit, OnDestroy {
   private subscriptions: Subscription[] = [];
   private activeTab: EditorTab | undefined;
   private activeLine = 1;
   private lineCount = 1;

   openedTabs$: Observable<EditorTab[]> = this.editorTabService.getOpenedTabs();
   activeTab$: Observable<EditorTab | undefined> = this.editorTabService.getActiveTab();
   activeLine$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

   constructor(public editorTabService: EditorTabService) { }

   ngOnInit() {
      this.subscriptions.push(
         this.editorTabService.getActiveTab().subscribe(activeTab => {
            this.setActiveLine(activeTab?.activeLine ?? 1);
            this.lineCount = activeTab?.lineCount ?? 1;
            this.activeTab = activeTab;
         })
      );
   }

   ngOnDestroy() {
      this.subscriptions.forEach(x => x.unsubscribe());
   }

   public handleMouseDown(e: MouseEvent) {
      // Using 'setTimeout' will allow the offset to be calculated from the current 'mousedown' instead of the last 'click' event.
      setTimeout(() => {
         const caretOffset = getCaretOffset();
         const clickedLine = getClickedLine(e.target as HTMLElement, caretOffset);
         this.setActiveLine(clickedLine);
         this.updateActiveTab(caretOffset, clickedLine);
      });
   }

   public handleKeyDown(e: KeyboardEvent) {
      // Using 'setTimeout' will allow the offset to be calculated from the current 'mousedown' instead of the last 'click' event.
      setTimeout(() => {
         const caretOffset = getCaretOffset();
         
         let newActiveLine: number | undefined;
         const { activeLine, lineCount } = this;

         switch (e.key) {
            case 'ArrowUp':
               newActiveLine = getActiveLineAfterArrowUp(activeLine);
               break;
            case 'ArrowDown':
               newActiveLine = getActiveLineAfterArrowDown(activeLine, lineCount);
               break;
            case 'ArrowLeft':
               newActiveLine = getActiveLineAfterArrowLeft(e, caretOffset, activeLine);
               break;
            case 'ArrowRight':
               newActiveLine = getActiveLineAfterArrowRight(e, caretOffset, lineCount, activeLine);
               break;
            default: 
               break;
         }

         if (newActiveLine) {
            this.setActiveLine(newActiveLine);
         }

         this.updateActiveTab(caretOffset, newActiveLine);
      });
   }

   private updateActiveTab(caretOffset: number, activeLine: number | undefined) {
      const { activeTab } = this;
      if (!activeTab) {
         return;
      }

      this.editorTabService.updateTab({
         ...activeTab,
         caretOffset,
         activeLine: activeLine ?? this.activeLine
      });
   }

   private setActiveLine(line: number) {
      this.activeLine = line;
      this.activeLine$.next(line);
   }
}
