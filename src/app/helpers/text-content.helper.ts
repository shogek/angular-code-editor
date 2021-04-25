/** Count the newline characters. */
export function getLineCount(text: string): number {
  return (text.match(/\n/g) || []).length + 1;
}
