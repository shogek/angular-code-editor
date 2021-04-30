import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-welcome-window',
  templateUrl: './welcome-window.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWindowComponent {
  constructor (private userFileService: UserFileService) { }

  public onLoadDummyFiles() {
    this.userFileService.useDummyFiles();
  }

  public onFilesUploaded(files: UserFile[]) {
    this.userFileService.setAll(files);
  }
}