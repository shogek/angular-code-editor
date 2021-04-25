/** I represent a file opened in the editor tab. */
export interface EditorTab {
  id: string;
  /** TODO: Document */
  userFileId: string;
  /** TODO: Document */
  name: string;
  /** TODO: Document */
  contents: string;
  /** TODO: Document */
  /** TODO: Implement functionality - opening tabs jumps to last know location. */
  cursorOffset: number;
  /** TODO: Document */
  /** TODO: Implement functionality - opening tabs jumps to last know location. */
  activeLine: number;
  /** TODO: Document */
  /** TODO: Implement functionality - opening tabs jumps to last know location. */
  lineCount: number;
}