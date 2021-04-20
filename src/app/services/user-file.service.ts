import { Injectable } from "@angular/core";
import { UserFile } from "../models/user-file.model";
import { MOCK_USER_FILES } from "../mock-user-files";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class UserFileService {
  private isDummyDataLoaded = false;
  private userFiles$ = new BehaviorSubject<UserFile[]>([]);
  private activeUserFile$ = new BehaviorSubject<UserFile | undefined>(undefined);

  public getUserFiles(): Observable<UserFile[]> {
    if (!this.isDummyDataLoaded) {
      this.loadDummyData();
      this.isDummyDataLoaded = true;
    }

    return this.userFiles$;
  }

  public getActiveFile(): Observable<UserFile | undefined> {
    return this.activeUserFile$;
  }

  public setActiveFile(fileId: string): void {
    const userFile = MOCK_USER_FILES.find(x => x.id === fileId);
    this.activeUserFile$.next(userFile);
  }

  /** Mimic dynamic loading. */
  private loadDummyData() {
    let delayInMs = 100;
    let userFiles: UserFile[] = [];
    
    this.setActiveFile(MOCK_USER_FILES[0].id);

    MOCK_USER_FILES.forEach(mockUserFile => {
      setTimeout(
        () => {
          userFiles = [...userFiles, mockUserFile];
          this.userFiles$.next(userFiles)
        },
        delayInMs
      );
      delayInMs += delayInMs;
    });
  }
}