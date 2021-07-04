import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { CommandPaletteItem } from "src/app/common";
import { EditorTheme } from "src/app/services";

@Component({
  selector: 'app-status-bar-row',
  templateUrl: './status-bar-row.component.html',
  styleUrls: ['./status-bar-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarRowComponent {
  @Input() latestMessage!: string;
  @Input() editorLineNumber: number | undefined;
  @Input() editorCaretOffset: number | undefined;
  @Input() set allEditorThemes(value: EditorTheme[]) {
    this._allEditorThemes = value;
    this.prepareEditorThemeChoices();
  } get allEditorThemes(): EditorTheme[] { return this._allEditorThemes; }
  @Input() set activeEditorTheme(value: EditorTheme) {
    this._activeEditorTheme = value;
    this.prepareEditorThemeChoices();
  } get activeEditorTheme(): EditorTheme { return this._activeEditorTheme; }

  @Output() themeSelected = new EventEmitter<EditorTheme>();
  @Output() themeConfirmed = new EventEmitter<EditorTheme>();
  @Output() themeReverted = new EventEmitter<void>();

  @ViewChild('themePickerToggle') themePickerToggle!: ElementRef;

  private _activeEditorTheme!: EditorTheme;
  private _allEditorThemes: EditorTheme[] = [];
  isThemePickerVisible = false;
  editorThemeChoices: CommandPaletteItem[] = [];

  public showEditorThemePicker() {
    /*
    * Fixes bug!
    * Theme picker, after pressing 'Enter', closes and then immediately opens up again
    */
    this.themePickerToggle.nativeElement.blur();

    this.isThemePickerVisible = true;
  }

  public onThemeSelected(item: CommandPaletteItem) {
    const theme = this.allEditorThemes.find(x => x.htmlClassName === item.value);
    this.themeSelected.emit(theme);
  }

  public onThemeConfirmed(item: CommandPaletteItem) {
    const theme = this.allEditorThemes.find(x => x.htmlClassName === item.value);
    this.themeConfirmed.emit(theme);
    this.isThemePickerVisible = false;
  }

  public onNoThemeFound() {
    this.themeReverted.emit();
  }

  public onThemePickerClosed() {
    this.themeReverted.emit();
    this.isThemePickerVisible = false;
  }

  private prepareEditorThemeChoices() {
    this.editorThemeChoices = StatusBarRowComponent.getAvailableEditorThemes(
      this.allEditorThemes,
      this.activeEditorTheme,
    );
  }

  private static getAvailableEditorThemes(allThemes: EditorTheme[], currentTheme: EditorTheme): CommandPaletteItem[] {
    if (!allThemes || allThemes.length < 1 || !currentTheme) {
      return [];
    }
    
    return allThemes
      .sort((themeA, themeB) => themeA.displayName.localeCompare(themeB.displayName))
      .map(
        theme => ({
          label: theme.displayName,
          value: theme.htmlClassName,
          isActive: currentTheme.displayName === theme.displayName,
        })
      );
  }
}