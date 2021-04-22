/** Count "newline" symbols leading up to the cursor's position. */
export function calculateLineClicked(element: HTMLElement): number {
  const caretOffset = getCaretOffset(element);
  const textUpToCaret = element.innerText.substring(0, caretOffset);
  const newLineCount = (textUpToCaret.match(/\n/g) || []).length + 1;
  return newLineCount;
}

/** Returns how many characters are behind the cursor. */
function getCaretOffset(element: HTMLElement): number {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  if (!range) {
    debugger;
    throw new Error("How did you manage to cause this situation?");
  }

  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
}
