import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandPaletteItem } from './common';
import { EditorTab } from './models/editor-tab.model';
import { UserFile } from './models/user-file.model';
import { EditorTabService } from './services/editor-tab/editor-tab.service';
import { UserFileService } from './services/user-file/user-file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'code-editor';

  items: CommandPaletteItem[] = [
    {
      label: 'Dark+ (default dark)',
      isActive: false,
      value: 'theme-dark-plus-default',
    },
    {
      label: 'Bluloco Light',
      isActive: true,
      value: 'theme-bluloco-light-italic',
    },
    {
      label: 'Material Theme Darker High Contrast',
      isActive: false,
      value: 'theme-material-darker-high-contrast',
    },
    {
      label: 'Monokai',
      isActive: false,
      value: 'theme-monokai',
    },
  ]; 

  editorTabs$: Observable<EditorTab[]> = this.editorTabService.getOpenedTabs();
  userFiles$: Observable<UserFile[]> = this.userFileService.getAll();

  constructor (
    private editorTabService: EditorTabService,
    private userFileService: UserFileService,
  ) { }


  // TODO: Document - cleanup
  private _originalTheme = 'theme-monokai';
  private _currentTheme = this._originalTheme;
  public onChoiceSelected(choice: CommandPaletteItem) {
    console.log(choice);
    document.body.classList.remove(this._currentTheme);
    this._currentTheme = choice.value;
    document.body.classList.add(this._currentTheme);
  }

  public onNoSearchResults() {
    document.body.classList.remove(this._currentTheme);
    this._currentTheme = this._originalTheme;
    document.body.classList.add(this._originalTheme);
  }
}
