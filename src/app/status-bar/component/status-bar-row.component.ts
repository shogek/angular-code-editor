import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { CommandPaletteItem } from "src/app/common";
import { EditorTheme } from "src/app/services";

@Component({
  selector: 'app-status-bar-row',
  templateUrl: './status-bar-row.component.html',
  styleUrls: ['./status-bar-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarRowComponent implements OnInit {
  @Input() latestMessage!: string;
  @Input() editorLineNumber: number | undefined;
  @Input() editorCaretOffset: number | undefined;
  @Input() allEditorThemes!: EditorTheme[];
  @Input() activeEditorTheme!: EditorTheme;

  @Output() themeSelected = new EventEmitter<EditorTheme>();
  @Output() themeConfirmed = new EventEmitter<EditorTheme>();
  @Output() themeReverted = new EventEmitter<void>();

  @ViewChild('themePickerToggle') themePickerToggle!: ElementRef;

  isThemePickerVisible = false;
  editorThemeChoices: CommandPaletteItem[] = [];

  ngOnInit() {
    this.editorThemeChoices = this.allEditorThemes
      .sort((themeA, themeB) => themeA.displayName.localeCompare(themeB.displayName))
      .map(
      theme => ({
        label: theme.displayName,
        value: theme.htmlClassName,
        isActive: this.activeEditorTheme.displayName === theme.displayName,
      })
    );
  }

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
}