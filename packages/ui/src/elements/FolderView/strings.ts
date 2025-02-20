export const strings = {
  enterSubfolder: 'Enter Subfolder',
  folderName: 'Folder Name',
  item: 'item',
  items: 'items',
  move: 'Move',
  moveNItems: (count: number) => `Move ${count} ${count === 1 ? strings.item : strings.items}`,
  moveTo: 'Move To',
  movingNItems: (count: number) => `Moving ${count} ${count === 1 ? strings.item : strings.items}`,
  newFolder: 'New Folder',
  removeFromFolder: 'Remove from Folder',
  rename: 'Rename',
  renameFolder: 'Rename Folder',
  selectFile: 'Select File',
  selectFolder: 'Select Folder',
}
