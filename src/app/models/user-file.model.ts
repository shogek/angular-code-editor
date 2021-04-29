/** I represent a file uploaded by the user. */
export interface UserFile {
  /** TODO: Use something unique here, like path to file + file size. */
  id: string;
  /** The "test.ts" part of file "test.ts". */
  name: string;
  /** The contents of the file "test.ts". */
  contents: string;
  /** The "ts" part of file "test.ts". */
  extension: string;
}