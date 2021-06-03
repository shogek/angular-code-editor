import { getLineCount } from "src/app/helpers/text-content.helper";

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

  return caretOffset + 1; // +1 because it's zero-based
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
}
