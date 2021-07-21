/** I represent a line in File Explorer's tree view. */
export interface TreeItem {
  /** The text that will be displayed in the File Explorer. */
  name: string;
  /** Path to the file or directory. Ex.: `'src/app'`, `'src/test.txt'`. */
  path: string;
  /** Depth level of the file or directory. Ex.: `'src/app'` = 2, `'src/test/test.txt'` = 3. */
  depth: number;
  /** Indicates if the tree item should be shown. */
  isVisible: boolean;
  /** Indicates if the tree item was clicked on. */
  isActive: boolean;
  /** Indicates if the tree item should be expanded (if folder) or shown (if file). */
  isExpanded: boolean;

  // When TreeItem is of type File
  isFile: boolean;
  fileId: string;  
  fileIcon: string;
}