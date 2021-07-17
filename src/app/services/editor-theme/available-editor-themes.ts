import { EditorTheme } from "./editor-theme.model";

export const AVAILABLE_THEMES: EditorTheme[] = [
    {
        displayName: 'Dark+ (default dark)',
        htmlClassName: 'theme-dark-plus-default',
        isDarkTheme: true,
    },
    {
        displayName: 'Monokai',
        htmlClassName: 'theme-monokai',
        isDarkTheme: true,
    },
    {
        displayName: 'Material Theme Darker High Contrast',
        htmlClassName: 'theme-material-darker-high-contrast',
        isDarkTheme: true,
    },
    {
        displayName: 'Bluloco Light Italic',
        htmlClassName: 'theme-bluloco-light-italic',
        isDarkTheme: false,
    },
];