import { UserFile } from "./user-file.model";

export class Folder {
    /** Name of the folder. Ex.: `"test"`. */
    private _name!: string;
    /** Path to the folder (including the folder's name). Ex.: `"src/test"`. */
    private _path!: string;
    /** How deep in the folder tree it appears. Ex.: `"src/test"` would be `2`. */
    private _depth!: number;
    /** Files within this folder. */
    private _files: UserFile[] = [];
    /** Other folders within this one. */
    private _folders: Folder[] = [];

    private _sortOrder!: number;

    /** @param pathToFolder Must include the folder's name. Ex.: `"src/test"`. */
    constructor(pathToFolder: string, sortOrder: number) {
        this._name = pathToFolder.split('/').pop()!;
        this._path = pathToFolder;
        this._depth = pathToFolder.split('/').length;

        this._sortOrder = sortOrder;
    }

    public get name(): string {
        return this._name;
    }

    public get path(): string {
        return this._path;
    }

    public get depth(): number {
        return this._depth;
    }

    public get files(): UserFile[] {
        return this._files;
    }

    public get sortOrder(): number {
        return this._sortOrder;
    }
    
    public addFile(file: UserFile) {
        if (!file) {
            debugger;
            throw new Error("Can't add a non existing file!");
        }

        this._files.push(file);
    }

    public addFolder(folder: Folder) {
        if (!folder) {
            debugger;
            throw new Error("Can't add a non existing folder!");
        }

        this._folders.push(folder);
    }

    public contains(folder: Folder): boolean {
        return !!this._folders.find(x => x._path === folder.path);
    }
}