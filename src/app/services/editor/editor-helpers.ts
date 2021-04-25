export function calculateFileLineCount(fileContents: string) {
  return fileContents.split('\n').length;
}