import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { ContextMenuItem } from "src/app/common";
import { FileExplorerTreeItemMenu } from "./file-explorer-tree-item.menu";

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
    @Output() delete = new EventEmitter<void>();

    contextMenuChoices: ContextMenuItem[] = [
        { label: FileExplorerTreeItemMenu.Delete, isDisabled: false },
        { label: FileExplorerTreeItemMenu.Rename, isDisabled: false },
    ];

    public onContextMenuItemClicked(choice: ContextMenuItem) {
        switch (choice.label) {
            case FileExplorerTreeItemMenu.Delete: return this.deleteItem();
            case FileExplorerTreeItemMenu.Rename: return this.renameItem();
            default: throw new Error(`Unknown context menu item: ${choice}`);
        }
    }

    private deleteItem() {
        const message = this.isFile
            ? `Are you sure you want to delete '${this.name}'?`
            : `Are you sure you want to delete '${this.name}' and its contents?`;

        if (window.confirm(message)) {
            this.delete.emit();
        }
    }

    private renameItem() {
        alert('Implement me!');
    }
}