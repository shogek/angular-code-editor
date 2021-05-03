import { getLineCount } from "src/app/helpers/text-content.helper";
import { EditorTab } from "src/app/models/editor-tab.model";
import { UserFile } from "src/app/models/user-file.model";

export class EditorTabManager {
  /** [KEY] tabId | [VAL] EditorTab */
  private tabMap = new Map<string, EditorTab>();

  public createTabs(files: UserFile[]) {
    // TODO: Create tab only when file opened - then cache it.
    files.forEach(file => {
      const tab: EditorTab = {
        id: `${file.name}-${file.id}`,
        userFileId: file.id,
        name: file.name,
        contents: file.contents,
        fileExtension: file.extension,
        caretOffset: 0,
        activeLine: 1,
        lineCount: getLineCount(file.contents),
        iconPath: file.iconPath
      };

      this.tabMap.set(tab.id, tab);
    });
  }

  public getOrCreateTabFromFile(file: UserFile) {
    // TODO: tabManager should keep track of tabs by FileID
  }

  public getRandomTab(): EditorTab | undefined {
    for (let tab of this.tabMap.values()) {
      return tab;
    }

    return undefined;
  }

  public getAllTabs(): EditorTab[] {
    return Array.from(this.tabMap.values());
  }

  public getTabById(tabId: string): EditorTab {
    if (!this.tabMap.has(tabId)) {
      debugger;
      throw new Error('Tab with this ID does not exist!');
    }

    return this.tabMap.get(tabId)!;
  }

  public updateTab(tab: EditorTab) {
    this.tabMap.set(tab.id, tab);
  }

  public removeTab(tabId: string): void {
    this.tabMap.delete(tabId);
  }
}