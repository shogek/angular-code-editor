import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { calculateLineClicked } from "./editor-logic";

@Injectable()
export class EditorService {
  private activeLine$ = new BehaviorSubject<number>(0);

  public getActiveLine(): Observable<number> {
    return this.activeLine$;
  }

  /**
   * Call when the user clicks the editable file content's area.
   * @param editorHtmlElement DOM element with the attribute 'contenteditable'.
   */
  public registerEditorClicked(editor: HTMLElement): void {
    const lineClicked = calculateLineClicked(editor);
    this.activeLine$.next(lineClicked);
  }

  public setActiveLine(line: number): void {
    this.activeLine$.next(line);
  }
}
