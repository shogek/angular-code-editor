import { getLineCount } from "src/app/helpers/text-content.helper";
import { EditorTab } from "src/app/models/editor-tab.model";
import { UserFile } from "src/app/models/user-file.model";
import { addTypeScriptCodeSyntaxColoring } from "./typescript-syntax-regexes";

export class EditorTabManager {
  /** [KEY] tabId | [VAL] EditorTab */
  private tabMap = new Map<string, EditorTab>();

  constructor(files: UserFile[]) {
    files.forEach(file => {
      const fileContentsAsTypescript = this.formatFileContentAsTypescript(file.contents);
      const tab = {
        id: `${file.name}-${file.id}`,
        userFileId: file.id,
        name: file.name,
        contents: fileContentsAsTypescript,
        caretOffset: 0,
        activeLineElementId: this.getIdOfFirstLineElement(fileContentsAsTypescript),
        lineCount: getLineCount(file.contents)
      } as EditorTab;

      this.tabMap.set(tab.id, tab);
    });
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

  private formatFileContentAsTypescript(fileContents: string): string {
    // Surround some of language's keywords with <span> tags to add coloring
    const contentWithSpans = addTypeScriptCodeSyntaxColoring(fileContents);

    // Add unique ID values to each of the <span> tags
    const spans = contentWithSpans.split('<span');
    const id = 'span-';
    let contentWithUniqueSpans = spans[0];
    for (let i = 1; i <= spans.length; i++) {
      const updatedSpan = `<span id="${id}${i}"`; // TODO: Use unique IDs
      contentWithUniqueSpans += updatedSpan + spans[i];
    }

    // Surround each of the file's lines with <p> tags
    const lines = contentWithUniqueSpans
      .split('\n')
      .map((line, i) =>
        '<p ' +
          `id="line-${i + 1}"` + // TODO: Use unique IDs
          `line="${i + 1}">` +
            line + 
          '</p>'
      ).join('');

    return lines;
  }

  private getIdOfFirstLineElement(fileContents: string): string {
    // const regex = /<p id="(.*)"/;
    // const result = fileContents.match(regex);
    // TODO: After <p> and <span> has unique IDs
    return 'line-1';
  }
}