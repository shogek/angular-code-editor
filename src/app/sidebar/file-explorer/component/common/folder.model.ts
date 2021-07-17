import { UserFile } from "src/app/models/user-file.model";

// TODO: Still used?

export class Folder {
  public path!: string;
  public name!: string;
  public files: UserFile[] = [];
  public folders: Folder[] = [];

  constructor (path: string, folderName: string) {
    this.path = path;
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

    const newChildFolder = new Folder(this.getFolderPath(file), folderName);
    this.folders.push(newChildFolder);
    newChildFolder.parse(file, folderNames);
  }

  private getFolderPath(file: UserFile): string {
    return file.path.split('/').slice(0, -1).join('');
  }
}