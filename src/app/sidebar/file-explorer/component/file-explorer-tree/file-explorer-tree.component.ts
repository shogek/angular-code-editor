import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";

// TODO: Show all kinds of text in file explorer if no files loaded
// TODO: Fix bug - if grandparent is toggle, child file should follow parent folder's visiblity

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
    this.treeItems = this.mapToCustomObject(value);
  }
  @Output() fileClicked = new EventEmitter<string>();

  treeItems: TreeItem[] = [];

  public onTreeItemFileClicked(path: string, fileId: string) {
    // TODO: Refactor to adhere to types
    this.treeItems = this.treeItems.map(
      treeItem => treeItem.path === path
        ? ({...treeItem, isActive: true})
        : ({...treeItem, isActive: false})
    );

    this.fileClicked.emit(fileId);
  }

  // TODO: Document and simplify code
  public onTreeItemFolderClicked(path: string, isExpanded: boolean) {
    this.treeItems = this.treeItems.map(treeItem => {
      if (treeItem.path === path) {
        // TODO: Does type safety work here?
        return {...treeItem, isExpanded: isExpanded, isActive: true};
      }

      if ((treeItem.path + '/').startsWith(path + '/')) {
        return {...treeItem, isVisible: isExpanded, isActive: false};
      }

      return {...treeItem, isActive: false};
    });
  }

  // TODO: Document and simplify code
  private mapToCustomObject(files: UserFile[]) {
    const treeItems: { [pathToDirectory: string] : TreeItem; } = {};

    for (const file of files) {
      const path = file.path.split('/');      // ['src', 'component', 'test', 'file.txt']
      const fileName = path[path.length - 1]; // 'file.txt'
      const pathToFile = path.slice(0, -1);   // ['src', 'component', 'test']

      pathToFile.forEach((directoryName, i) => {
        // 'src' -> 'src/component' ->  'src/component/test'
        const pathToDirectory = pathToFile.slice(0, i + 1).join('/');

        if (treeItems[pathToDirectory]) {
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

// TODO: Document and move to separate file
export interface TreeItem {
  name: string;
  path: string;
  depth: number;
  isFile: boolean;
  fileIcon: string;
  fileId: string;
  isVisible: boolean;
  isActive: boolean;
  isExpanded: boolean;
}