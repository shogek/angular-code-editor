import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { EditorTheme } from "./editor-theme.model";
import { AVAILABLE_THEMES } from "./available-editor-themes";

const defaultTheme = AVAILABLE_THEMES[0];

@Injectable()
export class EditorThemeService {
    private _temporaryTheme: EditorTheme | null = null;
    private _activeTheme: EditorTheme = defaultTheme;
    private _activeTheme$ = new BehaviorSubject<EditorTheme>(defaultTheme);

    constructor() {
        this.setTheme(defaultTheme);
    }

    public getAllThemes = (): EditorTheme[] => AVAILABLE_THEMES;

    public getActiveTheme = (): Observable<EditorTheme> => this._activeTheme$.asObservable();

    public setTemporaryTheme(theme: EditorTheme) {
        if (!this._temporaryTheme) {
            document.body.classList.remove(this._activeTheme.htmlClassName);
        } else {
            document.body.classList.remove(this._temporaryTheme.htmlClassName);
        }
        document.body.classList.add(theme.htmlClassName);

        this._temporaryTheme = theme;
    }

    public unsetTemporaryTheme() {
        if (!this._temporaryTheme) {
            // Opened and immediately closed theme picker
            return;
        }

        document.body.classList.remove(this._temporaryTheme.htmlClassName);
        document.body.classList.add(this._activeTheme.htmlClassName);

        this._temporaryTheme = null;
    }

    public setTheme(theme: EditorTheme) {
        this._temporaryTheme = null;

        // Don't set the same theme again
        if (theme.htmlClassName === this._activeTheme.htmlClassName) {
            return;
        }

        document.body.classList.remove(this._activeTheme.htmlClassName);
        document.body.classList.add(theme.htmlClassName);

        this._activeTheme = theme;
        this._activeTheme$.next(theme);
    }
}