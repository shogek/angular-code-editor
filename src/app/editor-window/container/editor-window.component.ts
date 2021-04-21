import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserFile } from "src/app/models/user-file.model";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
   selector: 'app-editor',
   templateUrl: './editor-window.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorWindowComponent implements OnInit {
   userFiles$: Observable<UserFile[]> = new Observable();
   activeFile$: Observable<UserFile> = new Observable();

   constructor(private userFileService: UserFileService) {}

   ngOnInit(): void {
      this.userFiles$ = this.userFileService.getUserFiles();
      this.activeFile$ = this.userFileService.getActiveFile();
   }
}