import { Injectable } from "@angular/core";
import { UserFile } from "../models/user-file.model";
import { MOCK_USER_FILES } from "../mock-user-files";
import { BehaviorSubject, Observable } from "rxjs";
import { getFileIcon } from "../helpers/icon.helper";

@Injectable()
export class UserFileService {
  private files: UserFile[] = [];
  private files$ = new BehaviorSubject<UserFile[]>([]);

  public get(id: string): UserFile {
    return this.files.find(file => file.id === id)!;
  } 

  public getAll(): Observable<UserFile[]> {
    return this.files$;
  }

  public useDummyFiles() {
    this.setFiles(MOCK_USER_FILES);
  }

  public async setAll(fileList: FileList) {
    const userFiles: UserFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const fileContents = await this.getFileContent(file);
      const fileExtension = file.name.split('.').pop()!;
      userFiles.push({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        contents: fileContents,
        extension: fileExtension,
        path: (file as any).webkitRelativePath || '',
        iconPath: getFileIcon(fileExtension)
      });
    }

    this.setFiles(userFiles);
  }

  public remove(fileId: string): void {
    this.files = this.files.filter(file => file.id !== fileId);
  }

  private setFiles(files: UserFile[]) {
    this.files = files;
    this.files$.next(files);
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
}