import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
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
    @Input() chevronDownIcon!: string;
    @Input() chevronRightIcon!: string;

    isOpen = false;
}