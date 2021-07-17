import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { getFolderIcon } from "src/app/helpers/icon.helper";
import { UserFile } from "src/app/models/user-file.model";

@Component({
    selector: 'app-file-explorer-tree-folder',
    templateUrl: './file-explorer-tree-folder.component.html',
    styleUrls: ['./file-explorer-tree-folder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTreeFolderComponent {
    @Input() folderName!: string;
    @Input() folderDepth!: number;
    @Input() files: UserFile[] = [];

    isOpen = false;
    folderIcon = getFolderIcon();
}