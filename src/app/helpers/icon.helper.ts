const iconFolder = '/assets/icons/';
const iconPathTable: {[fileExtension: string]: string} = {
  'ts': iconFolder + 'ts.svg',
  'scss': iconFolder + 'scss.svg',
  'html': iconFolder + 'html.svg',
  'folder': iconFolder + 'folder.svg',
  'default': iconFolder + 'file.svg',
};

/**
 * Returns a path to an icon which represents a folder.
 * @returns Example: '/assets/icons/folder.svg'.
 */
export function getFolderIcon(): string {
  return iconPathTable['folder'];
}

/**
 * Returns a path to an icon which represents the passed in file extension.
 * @param fileExtension Example: 'ts'.
 * @returns Example: '/assets/icons/file.svg'.
 */
export function getFileIcon(fileExtension: string): string {
  return iconPathTable[fileExtension] ?? iconPathTable['default'];
}