import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";
import { TreeItem } from "./tree-item.model";

// TODO: Show all kinds of text in file explorer if no files loaded

@Component({
  selector: 'app-file-explorer-tree',
  templateUrl: './file-explorer-tree.component.html',
  styleUrls: ['./file-explorer-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTreeComponent {
  @Input() chevronDownIcon!: string;
  @Input() chevronRightIcon!: string;
  @Input() set userFiles(value: UserFile[]) {
    this.treeItems = this.mapToTreeItem(value);
  }
  @Output() fileClicked = new EventEmitter<string>();

  treeItems: TreeItem[] = [];

  public onTreeItemFileClicked(path: string, fileId: string) {
    this.treeItems = this.treeItems.map((treeItem): TreeItem => ({
        ...treeItem,
        isActive: treeItem.path === path,
      })
    );

    this.fileClicked.emit(fileId);
  }

  /**
   * @param path Ex.: `'src/component/test'`
   * @param isExpanded Whether the folder was expanded or collapsed
   */
  public onTreeItemFolderClicked(path: string, isExpanded: boolean, depth: number) {
    this.treeItems = this.treeItems.map((treeItem): TreeItem => {
      // Found item which was directly clicked on.
      if (treeItem.path === path) {
        return {...treeItem, isExpanded: isExpanded, isActive: true};
      }

      // Check if descendant - 'src/component/test' && 'src/component/' == true
      if ((treeItem.path + '/').startsWith(path + '/')) {
        // Check if direct child
        // TODO: Fix bug with grandparent-parent folder visibility
        if (treeItem.isFile && treeItem.depth === depth + 1) {
          // Make sure folder's contents remain collapsed after parent folder is toggled
          return {...treeItem, isVisible: isExpanded, isActive: false, isExpanded: isExpanded};
        }
        return {...treeItem, isVisible: isExpanded, isActive: false};
      }

      return {...treeItem, isActive: false};
    });
  }

  private mapToTreeItem(files: UserFile[]) {
    const treeItems: { [pathToDirectory: string] : TreeItem; } = {};

    for (const file of files) {
      const path = file.path.split('/');      // ['src', 'component', 'test', 'file.txt']
      const fileName = path[path.length - 1]; // 'file.txt'
      const pathToFile = path.slice(0, -1);   // ['src', 'component', 'test']

      pathToFile.forEach((directoryName, i) => {
        // 'src' -> 'src/component' ->  'src/component/test'
        const pathToDirectory = pathToFile.slice(0, i + 1).join('/');

        if (treeItems[pathToDirectory]) {
          // TreeItem for folder was already created
          return;
        }
        
        treeItems[pathToDirectory] = {
          name: directoryName,
          path: pathToDirectory,
          depth: i + 1,
          isActive: false,
          isVisible: true,
          isExpanded: true,
          isFile: false,
          fileId: '',
          fileIcon: '',
        };
      });

      treeItems[file.path] = {
        name: fileName,
        path: file.path,
        depth: path.length,
        isActive: false,
        isVisible: true,
        isExpanded: true,
        isFile: true,
        fileId: file.id,
        fileIcon: file.iconPath,
      };
    }

    return Object
      .keys(treeItems)
      .map(key => treeItems[key]);
  }
}