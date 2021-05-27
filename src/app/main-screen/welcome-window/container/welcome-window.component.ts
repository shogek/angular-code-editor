import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserFileService } from "src/app/services/user-file/user-file.service";

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

  public onFilesUploaded(fileList: FileList) {
    this.userFileService.setAll(fileList);
  }
}