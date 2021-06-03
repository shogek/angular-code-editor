import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
/** Responsible for showing messages in the status bar (located at the bottom of the sceen). */
export class StatusBarService {
  private latestMessage$ = new BehaviorSubject<string>('');
  
  public getLatestMessage(): Observable<string> {
    return this.latestMessage$;
  }

  /** A message to be displayed in the status bar. */
  public showMessage(text: string) {
    this.latestMessage$.next(text);
  }
}