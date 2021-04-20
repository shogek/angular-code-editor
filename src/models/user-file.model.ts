/** I represent a file uploaded by the user. */
export interface UserFile {
  /** The "test.ts" part of file "test.ts". */
  name: string;
  /** The contents of the file "test.ts". */
  contents: string;
}