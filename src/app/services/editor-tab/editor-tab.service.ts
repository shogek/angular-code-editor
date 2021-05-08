import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";
import { filterNullish } from "src/app/helpers/observable.helper";
import { EditorTab } from "src/app/models/editor-tab.model";
import { UserFile } from "src/app/models/user-file.model";
import { UserFileService } from "../user-file.service";
import { EditorTabManager } from "./editor-tab-manager";

@Injectable()
export class EditorTabService implements OnDestroy {
  private tabManager = new EditorTabManager();
  private subscriptions: Subscription[] = [];

  private openedTabs: EditorTab[] = [];
  private openedTabs$ = new BehaviorSubject<EditorTab[]>([]);
  private activeTab$ = this.openedTabs$.pipe(map(tabs => tabs.filter(tab => tab.isActive)[0]));

  constructor(public userFileService: UserFileService) {
    this.trackActiveUserFileToSetActiveTab();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getActiveTab(): Observable<EditorTab | undefined> {
    return this.activeTab$;
  }

  public getOpenedTabs(): Observable<EditorTab[]> {
    return this.openedTabs$;
  }

  public setActiveTab(tabId: string) {
    const updatedTabs = this.openedTabs.map(tab => ({...tab, isActive: tab.userFileId === tabId}));
    this.setOpenedTabs(updatedTabs);
  }

  public closeTab(userFileId: string): void {
    const tabsLeft = this.openedTabs.filter(tab => tab.userFileId !== userFileId);

    const closedTab = this.tabManager.get(userFileId)!;
    if (closedTab.isActive && tabsLeft.length > 0) {
      tabsLeft[0].isActive = true;
    }

    this.setOpenedTabs(tabsLeft);
  }

  public updateTab(tab: EditorTab): void {
    this.tabManager.update(tab);
  }

  private trackActiveUserFileToSetActiveTab() {
    this.subscriptions.push(
      this.userFileService
      .getActiveFile()
      .pipe(
        filterNullish(),
        map((file) => this.getEditorTabFromUserFile(file)),
        tap((tab) => this.addTab(tab))
      ).subscribe()
    );
  }

  private addTab(tab: EditorTab) {
    if (this.openedTabs.includes(tab)) {
      return;
    }

    const oldTabs = this.openedTabs.map(tab => ({...tab, isActive: false}));
    tab.isActive = true;
    const allTabs = [tab, ...oldTabs];
    this.setOpenedTabs(allTabs);
  }

  private getEditorTabFromUserFile(file: UserFile): EditorTab {
    const existingTab = this.tabManager.get(file.id);
    if (existingTab) {
      return existingTab;
    }

    const newTab = this.tabManager.create(file);
    this.tabManager.cache(newTab);
    return newTab;
  }

  private setOpenedTabs(tabs: EditorTab[]) {
    this.openedTabs = tabs;
    this.openedTabs$.next(tabs);
  }
}