import { getLineCount } from "src/app/helpers/text-content.helper";
import { EditorTab } from "src/app/models/editor-tab.model";
import { UserFile } from "src/app/models/user-file.model";

export class EditorTabManager {
  /** [KEY] tabId | [VAL] EditorTab */
  private tabMap = new Map<string, EditorTab>();

  /** Creates an EditorTab object form a UserFile. */
  public create(file: UserFile): EditorTab {
    const tab: EditorTab = {
      userFileId: file.id,
      name: file.name,
      isActive: false,
      contents: this.wrapLinesInSpanTags(file.contents),
      fileExtension: file.extension,
      caretOffset: 0,
      activeLine: 1,
      lineCount: getLineCount(file.contents),
      iconPath: file.iconPath
    };

    return tab;
  }

  public get(userFileId: string): EditorTab | undefined {
    return this.tabMap.has(userFileId)
      ? this.tabMap.get(userFileId)
      : undefined;
  }

  /** Caches the editor tab so it's not recreated the next time. */
  public cache(tab: EditorTab) {
    this.tabMap.set(tab.userFileId, tab);
  }

  public update(tab: EditorTab) {
    this.tabMap.set(tab.userFileId, tab);
  }

  private wrapLinesInSpanTags(fileContents: string): string {
    const result = fileContents
      .split('\n')
      .map(line => `<p>${line}</p>`)
      .join('');
    return result;
  }
}