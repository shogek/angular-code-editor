export function setCaretPosition(element: Element, offset: number) {
  const { firstChild } = element;
  if (!firstChild) {
    // Clicked on empty line
    setCaretToLineEnd(element);
    return;
  }

  if (firstChild.textContent!.length === offset) {
    // Last clicked position was at the end of the line
    setCaretToLineEnd(element);
    return;
  }

  setCaretToSpecificPosition(element, offset);
}

function setCaretToSpecificPosition(element: Element, offset: number) {
  const { firstChild } = element;

  const range = document.createRange();
  range.setStart(firstChild!, offset);
  range.setEnd(firstChild!, offset);

  const selection = window.getSelection();
  if (!selection) {
    debugger;
    throw new Error("You broke the 'set cursor to position' logic again?!");
  }

  selection.removeAllRanges();
  selection.addRange(range);
}

function setCaretToLineEnd(element: Element) {
  // Create a range (a range is like the selection but invisible)
  const range = document.createRange();
  range.selectNodeContents(element);
  // 'false' means collapse to end rather than the start
  range.collapse(false);
  const selection = window.getSelection();
  if (!selection) {
    debugger;
    throw new Error("You broke the 'set cursor to position' logic again?!");
  }

  selection.removeAllRanges();
  // Make the range you have just created the visible selection
  selection.addRange(range);
}
