import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-file-explorer-tree-item',
    templateUrl: './file-explorer-tree-item.component.html',
    styleUrls: ['./file-explorer-tree-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTreeItemComponent {
    @Input() name!: string;
    @Input() depth!: number;
    @Input() isFile!: boolean;
    @Input() fileIcon = '';
    @Input() chevronDownIcon = '';
    @Input() chevronRightIcon = '';
    @Input() isActive = false;
    @Input() isExpanded = false;
    @Output() clicked = new EventEmitter<void>();
}