import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { EditorTab } from "src/app/models/editor-tab.model";
import { EditorService } from "src/app/services/editor/editor.service";
import { calculateActiveLine } from "./editor-window-component.logic";

@Component({
   selector: 'app-editor',
   templateUrl: './editor-window.component.html',
   styleUrls: ['./editor-window.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorWindowComponent implements OnInit, OnDestroy {
   private subscription!: Subscription;

   allTabs$: Observable<EditorTab[]> = this.editorService.getAllTabs();
   activeTab$: Observable<EditorTab | undefined> = this.editorService.getActiveTab();
   activeLine$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

   constructor(public editorService: EditorService) { }

   ngOnInit() {
      this.subscription = this.editorService
         .getActiveTab()
         .subscribe(activeTab => this.activeLine$.next(activeTab?.activeLine ?? 1));
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

   public handleMouseDown(e: MouseEvent): void {
      // Using 'setTimeout' will allow the offset to be calculated from the current 'mousedown' instead of the last 'click' event.
      setTimeout(() => {
         const editor = e.target as HTMLElement;
         const activeLine = calculateActiveLine(editor);
         this.activeLine$.next(activeLine);
      });
   }
}
