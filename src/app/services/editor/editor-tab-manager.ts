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
        activeLineNumber: 1,
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

    const getId = this.getIdMaker();

    // Add unique ID values to each of the <span> tags
    const spans = contentWithSpans.split('<span');
    let contentWithUniqueSpans = spans[0];
    for (let i = 1; i <= spans.length; i++) {
      const updatedSpan = `<span id="${getId()}"`;
      contentWithUniqueSpans += updatedSpan + spans[i];
    }

    // Surround each of the file's lines with <p> tags
    const lines = contentWithUniqueSpans
      .split('\n')
      .map(line => `<p id="${getId()}">` + (line || `<span id="${getId()}"></span>`) + '</p>'
      ).join('');

    return lines;
  }

  private getIdOfFirstLineElement(fileContents: string): string {
    /*
     * Example of formated file contents:
     * <p id="ce-1619714413999">blah blah</p>
     *        ^^^^^^^^^^^^^^^^ is the part that we want (ID is result of Date.now())
    */
    const paragraphId = fileContents.substring(7, 23);
    if (/^ce-\d{13}$/.test(paragraphId)) {
      return paragraphId;
    }

    throw new Error("Did you change the way the IDs are generated? Or text rendering?");
  }

  private getIdMaker(): () => string {
    let lastId = Date.now();

    return () => {
      let newId = Date.now();
      while (newId === lastId) {
        newId = Date.now();
      }
      lastId = newId;
      // Prepend the ID with 'ce-' so JS won't yell about IDs that are only made up of numbers
      return 'ce-' + newId.toString();
    }
  }
}