export interface EditorTheme {
    /** Ex.: `"Bluloco Light Italic"`. */
    displayName: string;

    /** Corresponds to the class name used in styles.scss which loads the mixin! */
    htmlClassName: string;

    /** Either a light theme or a dark one. */
    isDarkTheme: boolean;
}