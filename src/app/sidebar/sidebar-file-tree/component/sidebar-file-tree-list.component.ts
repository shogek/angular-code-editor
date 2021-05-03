import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { UserFile } from "src/app/models/user-file.model";

// TODO: Document
// TODO: Proofread
// TODO: Try uploading files
// TODO: Try uploading real folder

@Component({
  selector: 'app-sidebar-file-tree-list',
  templateUrl: './sidebar-file-tree-list.component.html',
  styleUrls: ['./sidebar-file-tree-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFileTreeListComponent implements OnInit {
  @Input() userFiles!: UserFile[]
  @Output() fileClicked = new EventEmitter<string>();
  folder!: FileTreeNode;

  ngOnInit() {
    const folderNames = this.userFiles[0].path.split('/');
    const rootFolderName = folderNames[0];
    if (!rootFolderName) {
      debugger;
      throw new Error('what the fuck');
    }

    const rootFolder = new FileTreeNode(rootFolderName);
    this.userFiles.forEach(file => {
      const folders = file.path.split('/');
      folders.pop();
      rootFolder.parse(file, folders, true);
    });

    this.folder = rootFolder;
  }
}

// TODO: Move to separate file
// TODO: Rename
export class FileTreeNode {
  public folderName = '';
  public files: UserFile[] = [];
  public folders: FileTreeNode[] = [];

  constructor (folderName: string) {
    this.folderName = folderName;
  }

  public parse(file: UserFile, folderNames: string[], root?: boolean) {
    if (root) {
      // We're in the root folder and the first element in the file's path is the gonna be the root
      folderNames.shift();
    }

    let folderName = folderNames.shift();
    if (!folderName) {
      this.files.push(file);
      return;
    }
    
    const childFolder = this.folders.find(folder => folder.folderName === folderName);
    if (childFolder) {
      childFolder.parse(file, folderNames);
      return;
    }

    const newChildFolder = new FileTreeNode(folderName);
    this.folders.push(newChildFolder);
    newChildFolder.parse(file, folderNames);
  }
}

// TODO: Rename to "FolderNode"?
// class FileTreeNode {
//   private files: UserFile[] = [];
//   private folders: FileTreeNode[] = [];
//   folderName: string = '';

//   constructor (folderName: string) {
//     this.folderName = folderName;
//   }

//   public parse(file: UserFile, folderNames: string[]) {

//   }

//   public addFileToFolder(file: UserFile) {
//     this.files.push(file);
//   }
// }