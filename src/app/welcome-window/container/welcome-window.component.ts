import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-welcome-window',
  templateUrl: './welcome-window.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWindowComponent {
  constructor (private userFileService: UserFileService) {
    // TODO: Remove this when done testing
    this.onLoadDummyFiles();
  }

  // TODO: Don't open tabs when files loaded - just show them in tree structure
  public onLoadDummyFiles() {
    this.userFileService.useDummyFiles();
  }

  public onFilesUploaded(fileList: FileList) {
    this.userFileService.setAll(fileList);
  }
}