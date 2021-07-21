/** I represent a file uploaded by the user. */
export interface UserFile {
  id: string;
  /** The `"test.ts"` part of file `"app/tests/test.ts"`. */
  name: string;
  /** The contents of the file `"app/tests/test.ts"`. */
  contents: string;
  /** The `"ts"` part of the file `"app/tests/test.ts"`. */
  extension: string;
  /** The `"app/tests/test.ts"` part of the file `"app/tests/test.ts"`. */
  path: string;
  /** How deep in the directory tree it's located. Ex.: `"app/tests/test.ts".` would be `2`. */
  depth: number;
  /** Ex.: `"assets/icons/file.svg"` */
  iconPath: string;
}