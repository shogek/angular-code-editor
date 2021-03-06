export interface CommandPaletteItem {
    /** The text that will be showed on the button. */
    label: string;
    /** Indicates if the choice is currently active. */
    isActive: boolean;
    /** A unique value that represents the item. */
    value: string;
}