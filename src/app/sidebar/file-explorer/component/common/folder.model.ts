import { UserFile } from "src/app/models/user-file.model";

export class Folder {
  public name = '';
  public files: UserFile[] = [];
  public folders: Folder[] = [];

  constructor (folderName: string) {
    this.name = folderName;
  }

  /** Recursively traverse the files paths and generate a folder structure */
  public parse(file: UserFile, folderNames: string[], root?: boolean) {
    if (root) {
      // We're in the root folder and the first element in the file's path is the gonna be the root
      folderNames.shift();
    }

    let folderName = folderNames.shift();
    if (!folderName) {
      this.files.push(file);
      return;
    }
    
    const childFolder = this.folders.find(folder => folder.name === folderName);
    if (childFolder) {
      childFolder.parse(file, folderNames);
      return;
    }

    const newChildFolder = new Folder(folderName);
    this.folders.push(newChildFolder);
    newChildFolder.parse(file, folderNames);
  }
}