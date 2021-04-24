import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserFileService } from "../user-file.service";
import { calculateLineClicked, getCaretOffset } from "./editor-logic";

@Injectable()
export class EditorService implements OnDestroy {
  private destroy$ = new Subject();

  private caretOffset = 0;
  private activeLine = 0;
  private activeLine$ = new BehaviorSubject<number>(this.activeLine);

  constructor(private userFileService: UserFileService) {
    this.trackActiveFile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Get the line that is currently being highlighted in the editor. */
  public getActiveLine(): Observable<number> {
    return this.activeLine$;
  }

  /** Call when the user triggers the 'mousedown' event on the editable file's content area. */
  public registerEditorMouseDown(e: MouseEvent): void {
    // Use 'setTimeout' to let the browser finish processing and successfully get the caret's position.
    setTimeout(() => {
      this.caretOffset = getCaretOffset();
      const lineClicked = calculateLineClicked(e.target as HTMLElement, this.caretOffset);
      this.setActiveLine(lineClicked);
    });
  }

  /** Call when the user triggers the 'keydown' event on the editable file's content area. */
  public registerEditorKeyDown(e: KeyboardEvent): void {
    // Use 'setTimeout' to let the browser finish processing and successfully get the caret's position.
    // TODO: Remove 'setTimeout' and try changing '-1' to '0'
    // TODO: Move this to 'editor-logic.ts'
    setTimeout(() => {
      const currentCaretOffset = getCaretOffset();

      const keyClicked = e.key;

      if (keyClicked === 'ArrowUp' && this.activeLine > 1) {
        this.caretOffset = currentCaretOffset;
        this.setActiveLine(this.activeLine - 1);
        return; 
      }

      if (keyClicked === 'ArrowDown') {
        this.userFileService
          .getActiveFileLineCount()
          .subscribe(lineCount => {
            this.caretOffset = currentCaretOffset;
            if (lineCount >= this.activeLine + 1) {
              this.setActiveLine(this.activeLine + 1);
            }
          })
          .unsubscribe();
          return;
      }

      if (keyClicked === 'ArrowLeft' && this.activeLine !== 1) {
        this.userFileService
          .getActiveFile()
          .subscribe(activeFile => {
            this.caretOffset = currentCaretOffset;
            const symbolAfterCaret = activeFile.contents[currentCaretOffset - 1];
            if (symbolAfterCaret === '\n') {
              this.setActiveLine(this.activeLine - 1);
            }
          })
          .unsubscribe();
        return;
      }

      if (keyClicked === 'ArrowRight') {
        combineLatest([
          this.userFileService.getActiveFile(),
          this.userFileService.getActiveFileLineCount(),
        ])
        .subscribe(([activeFile, lineCount]) => {
          this.caretOffset = currentCaretOffset;
          if (this.activeLine >= lineCount) {
            // Caret already on last line in file.
            return;
          }

          const symbolCaretPassed = activeFile.contents[currentCaretOffset - 2];
          if (symbolCaretPassed === '\n') {
            this.setActiveLine(this.activeLine + 1);
          }
        })
        .unsubscribe();
        return;
      }
      this.caretOffset = currentCaretOffset;
    });
  }

  public setActiveLine(line: number): void {
    this.activeLine = line;
    this.activeLine$.next(line);
  }

  /** When the user switches tabs, set the active line to the first one in the file. */
  private trackActiveFile(): void {
    this.userFileService
      .getActiveFile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => this.setActiveLine(1));
  }
}
