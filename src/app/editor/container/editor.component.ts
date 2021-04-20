import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserFile } from "src/app/models/user-file.model";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
   selector: 'app-editor',
   templateUrl: './editor.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
   userFiles$: Observable<UserFile[]> = new Observable();
   activeFileContents$: Observable<string | undefined> = new Observable();

   constructor(private userFileService: UserFileService) {}

   ngOnInit(): void {
      this.userFiles$ = this.userFileService.getUserFiles();
      this.activeFileContents$ = this.userFileService
         .getActiveFile()
         .pipe(map((userFile) => userFile?.contents));
   }
}