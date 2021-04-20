import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
   selector: 'app-editor-screen',
   templateUrl: './editor-screen.component.html',
   styleUrls: ['./editor-screen.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorScreenComponent implements OnInit {
   /** Active file's content split into lines. */
   fileContentLines$: Observable<string[] | undefined> = new Observable();
   highlightedLine = NaN;

   constructor(private userFileService: UserFileService) {}

   ngOnInit(): void {
      this.fileContentLines$ = this.userFileService
         .getActiveFile()
         .pipe(map(userFile => userFile?.contents?.split('\n')));
   }

   lineClicked(lineNumber: number): void {
      this.highlightedLine = lineNumber;
   }
}