/** I represent a file uploaded by the user. */
export interface UserFile {
  id: string;
  /** The "test.ts" part of file "app/component/test.ts". */
  name: string;
  /** The contents of the file "app/component/test.ts". */
  contents: string;
  /** The "ts" part of the file "app/component/test.ts". */
  extension: string;
  /** The "app/component/test.ts" part of the file "app/component/test.ts". */
  path: string;
}