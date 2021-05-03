import { Injectable } from "@angular/core";

@Injectable()
export class IconService {
  private pathToIconFolder = '/assets/icons/';

  /** Example: '/assets/icons/folder.svg' */
  public getFolderIconPath(): string {
    return this.pathToIconFolder + 'folder.svg';
  }

  /** Example: '/assets/icons/file.svg' */
  public getFileIconPath(fileExtension: string): string {
    return this.pathToIconFolder + this.getFileIcon(fileExtension);    
  }

  private getFileIcon(fileExtension: string): string {
    switch (fileExtension) {
      case 'ts': return 'typescript.svg';
      case 'scss': return 'scss.svg';
      case 'html': return 'html.svg';
      case 'cs': return 'csharp.svg';
      default: return 'file.svg';
    }
  }
}