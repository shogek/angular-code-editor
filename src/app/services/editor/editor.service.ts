import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { MOCK_USER_FILES } from "src/app/mock-user-files";
import { EditorTab } from "src/app/models/editor-tab.model";
import { UserFileService } from "../user-file.service";
import { EditorTabManager } from "./editor-tab-manager";

@Injectable()
export class EditorService {
  private tabManager = new EditorTabManager(MOCK_USER_FILES);

  private allTabs$ = new BehaviorSubject<EditorTab[]>([]);
  private activeTab$ = new BehaviorSubject<EditorTab | undefined>(undefined);

  constructor(private userFileService: UserFileService) {
    this.loadTabs();
  }

  public getAllTabs(): Observable<EditorTab[]> {
    return this.allTabs$;
  }

  public getActiveTab(): Observable<EditorTab | undefined> {
    return this.activeTab$;
  }

  public openTab(tabId?: string): void {
    if (!tabId) {
      // Closed last tab.
      this.activeTab$.next(undefined);
      return;
    }

    this.getActiveTab()
    .pipe(take(1))
    .subscribe(activeTab => {
      if (activeTab?.id === tabId) {
        // Tab is already active.
        return;
      }

      const newTab = this.tabManager.getTabById(tabId);
      this.setActiveTab(newTab);
    })
    .unsubscribe();
  }

  public closeTab(tabId: string): void {
    const closedTab = this.tabManager.getTabById(tabId);
    this.tabManager.removeTab(tabId);
    this.userFileService.remove(closedTab.userFileId);

    const tabsLeft = this.tabManager.getAllTabs();
    this.allTabs$.next(tabsLeft);

    if (tabsLeft.length < 1) {
      // Closed last tab.
      this.setActiveTab(undefined);
      return;
    }

    this.activeTab$.subscribe(activeTab => {
      if (!activeTab) {
        debugger;
        throw new Error("This shouldn't be null - if a file exists, a tab must be opened!");
      }

      const closingCurrentTab = activeTab.id === tabId;
      if (closingCurrentTab) {
        const randomTab = this.tabManager.getRandomTab();
        this.setActiveTab(randomTab);
        return;
      }
    }).unsubscribe();
  }

  public updateTab(tab: EditorTab): void {
    this.tabManager.updateTab(tab);
  }

  private loadTabs(): void {
    const initialTab = this.tabManager.getRandomTab();
    this.setActiveTab(initialTab);

    const allTabs = this.tabManager.getAllTabs();
    this.allTabs$.next(allTabs);
  }

  private setActiveTab(tab?: EditorTab): void {
    this.activeTab$.next(tab);
  }
}
