/** I represent a file opened in the editor tab. */
export interface EditorTab {
  /** Acts as a unique identifier of the tab record. */
  userFileId: string;
  /** Text which will be show in the editor's tab. */
  name: string;
  /** Example: 'html'. */
  fileExtension: string;
  /** Indicates if the tab is currently opened and its contents visible. */
  isActive: boolean;
  /** Contents of a file which will be editable in the editor. */
  contents: string;
  /** Indicates how many characters are between the cursor and the start of file. */
  caretOffset: number;
  /** Indicates the currently selected line in the editor. */
  activeLine: number;
  // TODO: On click 'Delete'/'Backspace', check if line removed; on click 'Enter', check if line added.
  /** Indicates the number of lines the file has. */
  lineCount: number;
  /** Example: '/assets/icons/file.svg'. */
  iconPath: string;
}