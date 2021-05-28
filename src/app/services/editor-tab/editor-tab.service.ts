import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";
import { filterNullish } from "src/app/helpers/observable.helper";
import { EditorTab } from "src/app/models/editor-tab.model";
import { UserFile } from "src/app/models/user-file.model";
import { UserFileService } from "../user-file/user-file.service";
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

  public getActiveTabLineNumber(): Observable<number | undefined> {
    return this.activeTab$.pipe(map(tab => tab?.activeLine));
  }

  public getActiveTabCaretOffset(): Observable<number | undefined> {
    return this.activeTab$.pipe(map(tab => tab?.caretOffset));
  }

  public getOpenedTabs(): Observable<EditorTab[]> {
    return this.openedTabs$;
  }

  public setActiveTab(tabId: string) {
    const updatedTabs = this.openedTabs.map(tab => ({...tab, isActive: tab.userFileId === tabId}));
    this.setOpenedTabs(updatedTabs);
  }

  public closeTab(userFileId: string): void {
    const closedTab = this.openedTabs.find(tab => tab.userFileId === userFileId)!;
    const tabsLeft = this.openedTabs.filter(tab => tab.userFileId !== userFileId);

    if (closedTab.isActive && tabsLeft.length > 0) {
      tabsLeft[0].isActive = true;
    }

    this.setOpenedTabs(tabsLeft);
  }

  public updateTab(tab: EditorTab): void {
    this.tabManager.update(tab);

    const updatedTabs = this.openedTabs.map(
      openedTab => !openedTab.isActive ? openedTab : ({...openedTab, ...tab})
    );
    this.setOpenedTabs(updatedTabs);
  }

  private trackActiveUserFileToSetActiveTab() {
    this.subscriptions.push(
      this.userFileService
      .getActiveFile()
      .pipe(
        filterNullish(),
        tap((file) => this.openTabFromFile(file))
      ).subscribe()
    );
  }

  private openTabFromFile(file: UserFile) {
    const openedTab = this.openedTabs.find(tab => tab.userFileId === file.id);
    if (openedTab) {
      const updatedTabs = this.openedTabs.map(openedTab => ({...openedTab, isActive: openedTab.userFileId === file.id}));
      this.setOpenedTabs(updatedTabs);
      return;
    }

    const newTab = this.mapFileToTab(file);
    const allTabs = [newTab, ...this.openedTabs];
    const updatedTabs = allTabs.map(tab => ({...tab, isActive: file.id === tab.userFileId}));
    this.setOpenedTabs(updatedTabs);
  }

  private mapFileToTab(file: UserFile): EditorTab {
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