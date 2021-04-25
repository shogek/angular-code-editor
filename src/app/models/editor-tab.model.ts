/** I represent a file opened in the editor tab. */
export interface EditorTab {
  id: string;

  userFileId: string;

  /** Text which will be show in the editor's tab. */
  name: string;

  /** Contents of a file which will be editable in the editor. */
  contents: string;

  // TODO: Implement functionality - opening tabs jumps to last know location.
  /** Indicates how many characters are between the cursor and the start of file. */
  caretOffset: number;

  // TODO: Implement functionality - opening tabs jumps to last know location.
  /** Indicates the currently selected line in the editor. */
  activeLine: number;

  // TODO: Implement functionality - opening tabs jumps to last know location.
  /** Indicates the number of lines the file has. */
  lineCount: number;
}