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
