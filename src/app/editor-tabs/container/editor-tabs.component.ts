import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserFile } from "src/app/models/user-file.model";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorTabsComponent implements OnInit {
  allUserFiles$: Observable<UserFile[]> = new Observable();
  activeUserFileId$: Observable<string | undefined> = new Observable();

  constructor(private userFileService: UserFileService) {}

  ngOnInit(): void {
    this.allUserFiles$ = this.userFileService.getUserFiles();
    this.activeUserFileId$ = this.userFileService.getActiveFile().pipe(map(x => x?.id));
  }

  public tabClicked(fileId: string): void {
    this.userFileService.setActiveFile(fileId);
  }
}