import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserFileService } from "src/app/services/user-file.service";

@Component({
  selector: 'app-sidebar-file-tree',
  templateUrl: './sidebar-file-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFileTreeComponent {
  userFiles$ = this.userFileService.getAll();

  constructor (private userFileService: UserFileService) { }
}