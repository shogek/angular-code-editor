import { combineLatest, Observable } from "rxjs";
import { UserFile } from "src/app/models/user-file.model";

/** Count "newline" symbols leading up to the cursor's position. */
export function calculateLineClicked(element: HTMLElement, caretOffset?: number): number {
  caretOffset = caretOffset ?? getCaretOffset();
  const textUpToCaret = element.innerText.substring(0, caretOffset);
  const newLineCount = (textUpToCaret.match(/\n/g) || []).length + 1;
  return newLineCount;
}

/** Returns how many characters are behind the cursor. */
export function getCaretOffset(): number {
  const caretOffset = window.getSelection()?.getRangeAt(0).startOffset;
  if (typeof caretOffset !== 'number') {
    debugger;
    throw new Error('How did you manage to make this null?');
  }

  return caretOffset;
}

export function calculateOffsetAndActiveLineForArrows(
  keyPressed: string,
  activeLine: number,
  caretOffset: number,
  activeFile: Observable<UserFile | undefined>,
  activeFileLineCount: Observable<number>,
  caretOffsetCallback: (caretOffset: number) => void,
  activeLineCallback: (activeLine: number) => void,
): void {
  if (keyPressed === 'ArrowUp' && activeLine > 1) {
    calculateOffsetAndActiveLineForArrowUp(
      activeLine,
      caretOffsetCallback,
      activeLineCallback,
    );
    return;
  }

  if (keyPressed === 'ArrowDown') {
    calculateOffsetAndActiveLineForArrowDown(
      activeLine,
      activeFileLineCount,
      caretOffsetCallback,
      activeLineCallback,
    );
    return;
  }

  if (keyPressed === 'ArrowLeft' && activeLine !== 1) {
    calculateOffsetAndActiveLineForArrowLeft(
      activeLine,
      caretOffset,
      activeFile,
      caretOffsetCallback,
      activeLineCallback,
    );
    return;
  }

  if (keyPressed === 'ArrowRight') {
    calculateOffsetAndActiveLineForArrowRight(
      activeLine,
      caretOffset,
      activeFile,
      activeFileLineCount,
      caretOffsetCallback,
      activeLineCallback,
    );
    return;
  }
}

function calculateOffsetAndActiveLineForArrowUp(
  activeLine: number,
  caretOffsetCallback: (caretOffset: number) => void,
  activeLineCallback: (activeLine: number) => void,
): void {
  setTimeout(() => caretOffsetCallback(getCaretOffset()));
  activeLineCallback(activeLine - 1);
}

function calculateOffsetAndActiveLineForArrowDown(
  activeLine: number,
  activeFileLineCount: Observable<number>,
  caretOffsetCallback: (caretOffset: number) => void,
  activeLineCallback: (activeLine: number) => void,
): void {
  activeFileLineCount.subscribe(lineCount => {
    setTimeout(() => caretOffsetCallback(getCaretOffset()));

    if (lineCount >= activeLine + 1) {
      activeLineCallback(activeLine + 1);
    }
  })
  .unsubscribe();
}

function calculateOffsetAndActiveLineForArrowLeft(
  activeLine: number,
  caretOffset: number,
  activeFile: Observable<UserFile | undefined>,
  caretOffsetCallback: (caretOffset: number) => void,
  activeLineCallback: (activeLine: number) => void,
): void {
  activeFile.subscribe(activeFile => {
    if (caretOffset > 0) {
      caretOffsetCallback(caretOffset - 1);
    }

    const symbolAfterCaret = activeFile?.contents[caretOffset - 2];
    if (symbolAfterCaret === '\n') {
      activeLineCallback(activeLine - 1);
    }
  })
  .unsubscribe();
}

function calculateOffsetAndActiveLineForArrowRight(
  activeLine: number,
  caretOffset: number,
  activeFile: Observable<UserFile | undefined>,
  activeFileLineCount: Observable<number>,
  caretOffsetCallback: (caretOffset: number) => void,
  activeLineCallback: (activeLine: number) => void,
): void {
  combineLatest([
    activeFile,
    activeFileLineCount,
  ])
  .subscribe(([activeFile, lineCount]) => {
    if (!activeFile) {
      return;
    }

    if (caretOffset < activeFile.contents.length) {
      caretOffsetCallback(caretOffset + 1);
    }

    if (activeLine >= lineCount) {
      return;
    }

    const symbolCaretPassed = activeFile.contents[caretOffset - 1];
    if (symbolCaretPassed === '\n') {
      activeLineCallback(activeLine + 1);
    }
  })
  .unsubscribe();
}
