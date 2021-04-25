/** Calculate on which line the user clicked. */
export function calculateActiveLine(editor: HTMLElement): number {
  const caretOffset = window.getSelection()?.getRangeAt(0).startOffset;
  const textUpToCaret = editor.innerText.substring(0, caretOffset);
  const newLineCount = (textUpToCaret.match(/\n/g) || []).length + 1;
  return newLineCount;
}