import { UserFile } from "src/app/models/user-file.model";

const pathToIconFolder = '/assets/icons/';

const MOCK_USER_FILE_100: UserFile = {
  id: 'id100',
  name: 'editor-window-screen.component.html',
  extension: 'html',
  path: 'src/app/editor-window/component/editor-window-screen.component.html',
  iconPath: pathToIconFolder + 'html.svg',
  contents:
`<div
*ngIf="activeTab.contents"
class="container"
>

<app-editor-number-column
  class="number-container"
  [fileLineCount]="activeTab.lineCount"
  [activeLine]="activeLine"
></app-editor-number-column>

<p
  class="file-contents"
  contenteditable="true"
  (keydown)="onEditorKeyDown($event)"
  (mousedown)="onEditorMouseDown($event)"
>
  {{ activeTab.contents }}
</p>

</div>`};

const MOCK_USER_FILE_101: UserFile = {
  id: 'id101',
  name: 'editor-window-screen.component.scss',
  extension: 'scss',
  path: 'src/app/editor-window/component/editor-window-screen.component.scss',
  iconPath: pathToIconFolder + 'scss.svg',
  contents:
`:host {
  height: 100%;
}

.container {
  height: 100%;
  display: flex;
}

.number-container {
  width: 2%;
  padding-right: 1%;
}

.file-contents {
  width: 100%;
  margin: 0;
  line-height: 1.85rem;
  cursor: text;
  // Renders the space characters and displays indentation
  white-space: pre;

  &:focus-visible {
    outline: none;
  }
}`};

const MOCK_USER_FILE_102: UserFile = {
  id: 'id102',
  name: 'editor-window-screen.component.ts',
  extension: 'ts',
  path: 'src/app/editor-window/component/editor-window-screen.component.ts',
  iconPath: pathToIconFolder + 'ts.svg',
  contents:
`import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
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

   public onEditorMouseDown(e: MouseEvent) {
      this.onMouseDown.emit(e);
   }

   public onEditorKeyDown(e: KeyboardEvent) {
      this.onKeyDown.emit(e);
   }
}`};

const MOCK_USER_FILE_103: UserFile = {
  id: 'id103',
  name: 'editor-window.component.html',
  extension: 'html',
  path: 'src/app/editor-window/container/editor-window.component.html',
  iconPath: pathToIconFolder + 'html.svg',
  contents:
`<ng-container *ngIf="activeTab$ | async as activeTab">
<div class="wrapper">
  <app-editor-tabs
    class="tabs"
    [allTabs]="allTabs$ | async"
    [activeTab]="activeTab"
  ></app-editor-tabs>

  <app-editor-window-screen
    class="editor"
    [activeTab]="activeTab"
    [activeLine]="activeLine$ | async"
    (onMouseDown)="handleMouseDown($event)"
    (onKeyDown)="handleKeyDown($event)"
  ></app-editor-window-screen>
</div>
</ng-container>`};

const MOCK_USER_FILE_104: UserFile = {
  id: 'id104',
  name: 'editor-window.component.scss',
  extension: 'scss',
  path: 'src/app/editor-window/container/editor-window.component.scss',
  iconPath: pathToIconFolder + 'scss.svg',
  contents:
`:host {
  height: 100%;
  display: block;
}

.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.empty {
  height: 100%;
  display: grid;
  place-items: center;
}

.tabs {
  display: block;
}

.editor {
  display: block;
  overflow-y: auto;
}`};

const MOCK_USER_FILE_105: UserFile = {
  id: 'id105',
  name: 'editor-window.component.ts',
  extension: 'ts',
  path: 'src/app/editor-window/container/editor-window.component.ts',
  iconPath: pathToIconFolder + 'ts.svg',
  contents:
`import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
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

   allTabs$: Observable<EditorTab[]> = this.editorTabService.getAllTabs();
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
}`};

const MOCK_USER_FILE_106: UserFile = {
  id: 'id106',
  name: 'editor-window-component.logic.ts',
  extension: 'ts',
  path: 'src/app/editor-window/container/editor-window-component.logic.ts',
  iconPath: pathToIconFolder + 'ts.svg',
  contents:
`import { getLineCount } from "src/app/helpers/text-content.helper";

/** Calculate on which line the user clicked. */
export function getClickedLine(editor: HTMLElement, caretOffset?: number): number {
  caretOffset =  caretOffset ?? window.getSelection()?.getRangeAt(0).startOffset;
  const textUpToCaret = editor.innerText.substring(0, caretOffset);
  return getLineCount(textUpToCaret);
}

/** Returns how many characters are behind the cursor. */
export function getCaretOffset(): number {
  const caretOffset = window.getSelection()?.getRangeAt(0).startOffset;
  if (typeof caretOffset !== 'number') {
    throw new Error("How did you manage to pull this off?");
  }

  return caretOffset; 
}

export function getActiveLineAfterArrowUp(currentActiveLine: number): number | undefined {
  const newActiveLine = currentActiveLine - 1;
  return newActiveLine > 0
    ? newActiveLine
    : undefined;
}

export function getActiveLineAfterArrowDown(currentActiveLine: number, lineCount: number): number | undefined {
  const newActiveLine = currentActiveLine + 1;
  return lineCount >= newActiveLine
    ? newActiveLine
    : undefined;
}

export function getActiveLineAfterArrowLeft(
  e: KeyboardEvent,
  caretOffset: number,
  currentActiveLine: number
): number | undefined {
  const editor = e.target as HTMLElement;
  const symbolAfterCaret = editor.innerText[caretOffset];
  return symbolAfterCaret === '\n'
    ? currentActiveLine - 1
    : undefined;
}

export function getActiveLineAfterArrowRight(
  e: KeyboardEvent,
  caretOffset: number,
  lineCount: number,
  currentActiveLine: number
): number | undefined {
  if (currentActiveLine >= lineCount) {
      return;
  }

  const editor = e.target as HTMLElement;
  const symbolCaretPassed = editor.innerText[caretOffset - 1];
  return symbolCaretPassed === '\n'
    ? currentActiveLine + 1
    : undefined;
}`};

const MOCK_USER_FILE_107: UserFile = {
  id: 'id107',
  name: 'app.component.ts',
  extension: 'ts',
  path: 'src/app/app.component.ts',
  iconPath: pathToIconFolder + 'ts.svg',
  contents:
`import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorTab } from './models/editor-tab.model';
import { EditorTabService } from './services/editor-tab/editor-tab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'code-editor';

  editorTabs$: Observable<EditorTab[]> = this.editorTabService.getAllTabs();

  constructor (private editorTabService: EditorTabService) { }
}`};

const MOCK_USER_FILE_108: UserFile = {
  id: 'id108',
  name: 'app.component.scss',
  extension: 'scss',
  path: 'src/app/app.component.scss',
  iconPath: pathToIconFolder + 'scss.svg',
  contents:
`:host {
  height: 100%;
  display: block;
}

.editor-wrapper {
  display: flex;
}`};

const MOCK_USER_FILE_109: UserFile = {
  id: 'id109',
  name: 'app.component.html',
  extension: 'html',
  path: 'src/app/app.component.html',
  iconPath: pathToIconFolder + 'html.svg',
  contents:
`<ng-container *ngIf="(editorTabs$ | async).length > 0; else welcomeScreen">
<div class="editor-wrapper">
  <app-editor-window></app-editor-window>
  <app-sidebar-file-tree></app-sidebar-file-tree>
</div>
</ng-container>

<ng-template #welcomeScreen>
<app-welcome-window></app-welcome-window>
</ng-template>`};

const MOCK_USER_FILE_110: UserFile = {
  id: 'id110',
  name: 'test.txt',
  extension: 'txt',
  path: 'src/test.txt',
  iconPath: pathToIconFolder + 'file.svg',
  contents:
`Don't mind me, just trying to cause an exception.`};

export const MOCK_USER_FILES: UserFile[] = [
   MOCK_USER_FILE_100,
   MOCK_USER_FILE_101,
   MOCK_USER_FILE_102,
   MOCK_USER_FILE_103,
   MOCK_USER_FILE_104,
   MOCK_USER_FILE_105,
   MOCK_USER_FILE_106,
   MOCK_USER_FILE_107,
   MOCK_USER_FILE_108,
   MOCK_USER_FILE_109,
   MOCK_USER_FILE_110,
];