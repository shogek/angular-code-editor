import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { UserFile } from "../../models/user-file.model";
import { MOCK_USER_FILES } from "./mock-user-files";
import { StatusBarService } from "../status-bar/status-bar.service";
import { UserFileSource } from "./user-file-source";
import { IconService } from "../icon/icon-service";

@Injectable()
export class UserFileService {
  private _files: UserFile[] = [];
  private _files$ = new BehaviorSubject<UserFile[]>([]);
  private _activeFile$ = new BehaviorSubject<UserFile | undefined>(undefined);

  constructor(
    private statusBarService: StatusBarService,
    private iconService: IconService,
  ) { }

  public get(id: string): UserFile {
    return this._files.find(file => file.id === id)!;
  } 

  public getAll(): Observable<UserFile[]> {
    return this._files$.asObservable();
  }

  public getActiveFile(): Observable<UserFile | undefined> {
    return this._activeFile$.asObservable();
  }

  public useDummyFiles() {
    this.setFiles(MOCK_USER_FILES);
    this.statusBarService.showMessage('Loaded dummy files!');
  }

  public openFile(userFileId: string) {
    const activeFile = this._files.find(({ id }) => id === userFileId)!
    this._activeFile$.next(activeFile);
  }

  public async setAll(fileList: FileList, fileSource: UserFileSource) {
    const userFiles: UserFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const filePath = (file as any).webkitRelativePath || `unknown/${file.name}`;
      const fileContents = await this.getFileContent(file);
      const fileExtension = file.name.split('.').pop()!;
      userFiles.push({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        contents: fileContents,
        extension: fileExtension,
        path: filePath,
        depth: filePath.split('/').length,
        iconPath: this.iconService.getFileIcon(fileExtension)
      });
    }

    this.setFiles(userFiles);

    const message = this.getFileSourceMessage(fileSource);
    this.statusBarService.showMessage(message);
  }

  public remove(fileId: string) {
    const updatedFiles = this._files.filter(({id}) => id !== fileId);
    this.setFiles(updatedFiles);
  }

  /**
   * Remove all files within a specified folder.
   * @param path Ex.: `'src/component/test'`
   */
  public removeByFolder(folderPath: string) {
    const updatedFiles = this._files.filter(({path}) => {
      // 'src/test/app.ts' => 'src/test'
      const pathToFile = path.split('/').slice(0, -1).join('/');
      return !(pathToFile + '/').startsWith(folderPath + '/');
    });

    this.setFiles(updatedFiles);
  }

  private setFiles(files: UserFile[]) {
    this._files = files;
    this._files$.next(files);
  }

  private getFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) ?? '');
      reader.onerror = () => {
        debugger;
        reject('How did you manage to cause this?');
      }
      reader.readAsText(file);
    });
  }

  private getFileSourceMessage(fileSource: UserFileSource): string {
    let message = 'User uploaded ';
    switch (fileSource) {
      case UserFileSource.DragAndDrop: return message + 'files via drag and drop!';
      case UserFileSource.UploadedFiles: return message + 'custom files!';
      case UserFileSource.UploadedFolder: return message + 'a whole folder!';
    }
  } 
}