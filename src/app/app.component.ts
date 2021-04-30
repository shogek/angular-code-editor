import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorTab } from './models/editor-tab.model';
import { EditorTabService } from './services/editor/editor-tab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'code-editor';

  editorTabs$: Observable<EditorTab[]> = this.editorTabService.getAllTabs();

  constructor (private editorTabService: EditorTabService) { }
}
