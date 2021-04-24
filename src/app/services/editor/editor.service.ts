import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserFileService } from "../user-file.service";
import { calculateLineClicked, calculateOffsetAndActiveLineForArrows, getCaretOffset } from "./editor-logic";

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
    // TODO: Track file's contents memory to update active line when new characters are added or deleted
    calculateOffsetAndActiveLineForArrows(
      e.key,
      this.activeLine,
      this.caretOffset,
      this.userFileService.getActiveFile(),
      this.userFileService.getActiveFileLineCount(),
      (caretOffset) => this.caretOffset = caretOffset,
      (activeLine) => this.setActiveLine(activeLine),
    );
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
