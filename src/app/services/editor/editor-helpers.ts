export function calculateFileLineCount(fileContents: string) {
  return (fileContents.match(/\n/g) || []).length;
}