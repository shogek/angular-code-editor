import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { EditorTab } from "src/app/models/editor-tab.model";
import { EditorService } from "src/app/services/editor/editor.service";
import { OnMouseDownArgs } from "../common/on-mouse-down-args";
import {
   getClickedLine,
   getCaretOffset,
   getActiveLineAfterArrowUp,
   getActiveLineAfterArrowDown,
   getActiveLineAfterArrowLeft,
   getActiveLineAfterArrowRight
} from "./editor-window-component.logic";

@Component({
   selector: 'app-editor',
   templateUrl: './editor-window.component.html',
   styleUrls: ['./editor-window.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorWindowComponent implements OnInit, OnDestroy {
   private subscriptions: Subscription[] = [];
   private activeTab: EditorTab | undefined;
   private activeLineElementId = '';
   private lineCount = 1;

   allTabs$: Observable<EditorTab[]> = this.editorService.getAllTabs();
   activeTab$: Observable<EditorTab | undefined> = this.editorService.getActiveTab();
   // activeLineElementId$: BehaviorSubject<string> = new BehaviorSubject<string>('');

   constructor(public editorService: EditorService) { }

   ngOnInit() {
      this.subscriptions.push(
         this.editorService.getActiveTab().subscribe(activeTab => {
            // this.setActiveLine(activeTab?.activeLineElementId ?? '');
            this.lineCount = activeTab?.lineCount ?? 1;
            this.activeTab = activeTab;
         })
      );
   }

   ngOnDestroy() {
      this.subscriptions.forEach(x => x.unsubscribe());
   }

   public handleMouseDown(e: OnMouseDownArgs) {
      const { clickedLineElementId, caretOffset } = e;
         // this.setActiveLine(clickedLineElementId);
         this.updateActiveTab(caretOffset, clickedLineElementId);
   }
// TODO: Span 34 gets generated badly
// TODO: Fix active line not working on arrow press
   public handleKeyDown(e: KeyboardEvent) {
      // Using 'setTimeout' will allow the offset to be calculated from the current 'mousedown' instead of the last 'click' event.
      setTimeout(() => {
         const caretOffset = getCaretOffset();
         
         let newActiveLine: number | undefined;
         const { activeLineElementId, lineCount } = this;

         switch (e.key) {
            case 'ArrowUp':
               newActiveLine = getActiveLineAfterArrowUp(0);
               break;
            case 'ArrowDown':
               newActiveLine = getActiveLineAfterArrowDown(0, lineCount);
               break;
            case 'ArrowLeft':
               newActiveLine = getActiveLineAfterArrowLeft(e, caretOffset, 0);
               break;
            case 'ArrowRight':
               newActiveLine = getActiveLineAfterArrowRight(e, caretOffset, lineCount, 0);
               break;
            default: 
               break;
         }

         // if (newActiveLine) {
         //    this.setActiveLine(newActiveLine);
         // }

         this.updateActiveTab(caretOffset, '');
      });
   }

   private updateActiveTab(caretOffset: number, activeLineElementId: string | undefined) {
      const { activeTab } = this;
      if (!activeTab) {
         return;
      }

      this.editorService.updateTab({
         ...activeTab,
         caretOffset,
         activeLineElementId: activeLineElementId ?? this.activeLineElementId
      });
   }

   private setActiveLine(lineId: string) {
      // this.activeLineElementId = lineId;
      // this.activeLineElementId$.next(lineId);
   }
}
