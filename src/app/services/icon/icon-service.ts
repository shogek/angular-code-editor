import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EditorThemeService } from "../editor-theme/editor-theme.service";

// TODO: Explicitly import all icons for type safety?

const ICON_FOLDER = 'assets/icons';
const DARK_THEME_FOLDER = 'dark';
const LIGHT_THEME_FOLDER = 'light';

const ACTIVITY_BAR_FILES = 'files';
const COMMON_CHEVRON_RIGHT = 'chevron-right';
const COMMON_CHEVRON_DOWN = 'chevron-down';

const iconPathTable: {[fileExtension: string]: string} = {
  'ts': 'ts.svg',
  'scss': 'scss.svg',
  'html': 'html.svg',
  'default': 'file.svg',
};

@Injectable()
export class IconService {
    constructor(private editorThemeService: EditorThemeService) { }

    /**
    * Returns a path to an icon which represents the passed in file extension.
    * @param fileExtension Example: `'ts'`.
    * @returns Example: `'assets/icons/file.svg'`.
    */
    public getFileIcon(fileExtension: string): string {
        const iconName = iconPathTable[fileExtension] ?? iconPathTable['default'];
        return `${ICON_FOLDER}/${iconName}`;
    }

    public getChevronDownIcon = (): Observable<string> => this.getCommonIcon(COMMON_CHEVRON_DOWN);
    public getChevronRightIcon = (): Observable<string> => this.getCommonIcon(COMMON_CHEVRON_RIGHT);
    public getFilesIcon = (): Observable<string> => this.getCommonIcon(ACTIVITY_BAR_FILES);

    private getPathToIcon(iconName: string, isDarkTheme: boolean) {
        const themeFolder = isDarkTheme ? DARK_THEME_FOLDER : LIGHT_THEME_FOLDER;
        return `${ICON_FOLDER}/${themeFolder}/${iconName}.svg`;
    }

    private getCommonIcon(iconName: string): Observable<string> {
        return this.editorThemeService
            .getIsDarkTheme()
            .pipe(
                map(isDarkTheme => this.getPathToIcon(iconName, isDarkTheme))
            );
    }
}