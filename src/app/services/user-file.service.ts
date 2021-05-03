import { Injectable } from "@angular/core";
import { UserFile } from "../models/user-file.model";
import { MOCK_USER_FILES } from "../mock-user-files";
import { BehaviorSubject, Observable } from "rxjs";

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

  public setAll(files: UserFile[]) {
    this.files = files;
    this.files$.next(files);
  }

  public useDummyFiles() {
    this.files = MOCK_USER_FILES;
    this.files$.next(this.files);
  }

  public remove(fileId: string): void {
    this.files = this.files.filter(file => file.id !== fileId);
  }
}