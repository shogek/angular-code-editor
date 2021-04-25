import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { UserFile } from "src/app/models/user-file.model";
import { EditorService } from "src/app/services/editor/editor.service";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
   selector: 'app-editor',
   templateUrl: './editor-window.component.html',
   styleUrls: ['./editor-window.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorWindowComponent {
   userFiles$: Observable<UserFile[]> = this.userFileService.getUserFiles();
   activeFile$: Observable<UserFile | undefined> = this.userFileService.getActiveFile();
   activeLine$: Observable<number> = this.editorService.getActiveLine();

   constructor(
      public userFileService: UserFileService,
      public editorService: EditorService,
   ) {}

   public handleEditorMouseDown(e: MouseEvent): void {
      this.editorService.registerEditorMouseDown(e);
   }

   public handleEditorKeyDown(e: KeyboardEvent): void {
      this.editorService.registerEditorKeyDown(e);
   }
}
