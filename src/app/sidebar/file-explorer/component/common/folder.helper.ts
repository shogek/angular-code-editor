import { UserFile } from "src/app/models/user-file.model";
import { Folder } from "./folder.model";

// TODO: Still used?

/** Groups the files into folders based on their paths. */
export function createFolderTreeStructure(files: UserFile[]): Folder {
  const folderNames = files[0].path.split('/'); // ex.: ['src', 'app', 'test.txt']
  const rootFolderName = folderNames[0];
  if (!rootFolderName) {
    debugger;
    throw new Error('what the fuck');
  }

  const rootFolder = new Folder(getFolderPath(files[0]), rootFolderName);
  files.forEach(file => {
    const folders = file.path.split('/');
    folders.pop(); // ex.: ['src', 'app', 'test.txt'] -> ['src', 'app']
    rootFolder.parse(file, folders, true);
  });

  return rootFolder;
}

function getFolderPath(file: UserFile): string {
  return file.path.split('/').slice(0, -1).join('');
}