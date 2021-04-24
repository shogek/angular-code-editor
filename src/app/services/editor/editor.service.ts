import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserFileService } from "../user-file.service";
import { calculateLineClicked } from "./editor-logic";

@Injectable()
export class EditorService implements OnDestroy {
  private destroy$ = new Subject();

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

  /**
   * Call when the user triggers the 'click' event on the editable file's content area.
   * @param editorHtmlElement DOM element with the attribute 'contenteditable'.
   */
  public registerEditorClicked(editor: HTMLElement): void {
    const lineClicked = calculateLineClicked(editor);
    this.setActiveLine(lineClicked);
  }

  /**
   * Call when the user triggers the 'key down' event on the editable file's content area.
   * @param keyClicked Ex.: 'ArrowUp', '5', 'Ctrl'
   */
  public registerEditorKeyDowned(keyClicked: string): void {
    if (keyClicked === 'ArrowUp' && this.activeLine > 1) {
      this.setActiveLine(this.activeLine - 1);
      return; 
    }

    if (keyClicked === 'ArrowDown') {
      this.userFileService
        .getActiveFileLineCount()
        .subscribe(lineCount => {
          if (lineCount >= this.activeLine + 1) {
            this.setActiveLine(this.activeLine + 1);
          }
        })
        .unsubscribe();
    }
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
