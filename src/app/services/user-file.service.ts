import { Injectable } from "@angular/core";
import { UserFile } from "../models/user-file.model";
import { MOCK_USER_FILES } from "../mock-user-files";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable()
export class UserFileService {
  private isDummyDataLoaded = false;
  private userFiles$ = new BehaviorSubject<UserFile[]>([]);
  private activeUserFile$ = new BehaviorSubject<UserFile | undefined>(undefined);
  private isFirstFile = true;
  private previouslyActiveFile: UserFile | undefined;

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

  public getActiveFileLineCount(): Observable<number> {
    return this.activeUserFile$.pipe(
      map(activeFile => activeFile?.contents.split('\n').length ?? 1)
    );
  }

  public setActiveFile(fileId?: string): void {
    this.getActiveFile().subscribe(currentlyActiveFile => {
      if (currentlyActiveFile?.id === fileId) {
        return;
      }

      this.updatePreviouslyActiveFile(currentlyActiveFile);

      const requestedFile = MOCK_USER_FILES.find(x => x.id === fileId);
      this.activeUserFile$.next(requestedFile);
    }).unsubscribe();
  }

  public removeFile(fileId: string): void {
    combineLatest([
      this.getUserFiles(),
      this.getActiveFile()
    ]).pipe(
      (take(1))
    ).subscribe(([allFiles, activeFile]) => {
      const filesLeft = allFiles.filter(x => x.id !== fileId);
      this.userFiles$.next(filesLeft);

      if (this.previouslyActiveFile?.id == activeFile?.id && filesLeft.length > 0) {
        console.log('prev === curr');
        console.log('prev', this.previouslyActiveFile?.id, 'curr', activeFile?.id);
        console.log(' ');
        this.setActiveFile(filesLeft[0].id);
        return;
      }

      if (!this.previouslyActiveFile?.id && filesLeft.length > 0) {
        console.log('!prev');
        console.log('prev', this.previouslyActiveFile?.id, 'curr', activeFile?.id);
        console.log(' ');
        this.setActiveFile(filesLeft[0].id);
        return;
      }

      console.log('prev ? curr');
      console.log('prev', this.previouslyActiveFile?.id, 'curr', activeFile?.id);
      console.log(' ');

      if (filesLeft.length < 1) {
        console.log('no files');
        this.setActiveFile(undefined);
      }
      

      // if (!this.previouslyActiveFile?.id || this.previouslyActiveFile?.id)

      // if (activeFile?.id === fileId) {
        // this.setActiveFile(this.previouslyActiveFile?.id);
      // }
    })
    .unsubscribe();
  }

  /** Mimic dynamic loading. */
  private loadDummyData() {
    // let delayInMs = 100;
    let userFiles: UserFile[] = [];
    
    this.setActiveFile(MOCK_USER_FILES[0].id);

    MOCK_USER_FILES.forEach(mockUserFile => {
      setTimeout(
        () => {
          userFiles = [...userFiles, mockUserFile];
          this.userFiles$.next(userFiles)
        },
        // delayInMs
      );
      // delayInMs += delayInMs;
    });
  }

  /** Keep track which editor was previously opened before the current one. */
  private updatePreviouslyActiveFile(currentlyActiveFile: UserFile | undefined): void {
    if (this.isFirstFile) {
      this.isFirstFile = false;
      return;
    }

    // combineLatest([
    //   this.getUserFiles(),
    //   this.getActiveFile(),
    // ]).pipe(
    //   take(1)
    // ).subscribe(([allFiles, activeFile]) => {
    //   debugger;
    // }).unsubscribe();

    if (this.previouslyActiveFile?.id && this.previouslyActiveFile.id !== currentlyActiveFile?.id) {
      this.previouslyActiveFile = currentlyActiveFile
    }
  }
}