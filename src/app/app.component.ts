import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  editorTabs$: Observable<EditorTab[]> = this.editorTabService.getOpenedTabs();
  userFiles$: Observable<UserFile[]> = this.userFileService.getAll();

  constructor (
    private editorTabService: EditorTabService,
    private userFileService: UserFileService,
  ) { }
}
