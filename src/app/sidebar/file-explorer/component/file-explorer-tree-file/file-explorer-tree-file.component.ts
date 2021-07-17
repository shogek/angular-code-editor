import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: 'app-file-explorer-tree-file',
    templateUrl: './file-explorer-tree-file.component.html',
    styleUrls: ['./file-explorer-tree-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTreeFileComponent {
    // TODO: Is every input used?
    @Input() fileName!: string;
    @Input() filePath!: string;
    @Input() fileDepth!: number;
    @Input() fileIcon!: string;
    @Input() isActive!: boolean;
}