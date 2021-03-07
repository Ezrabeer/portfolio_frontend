export const isLocalStorageDefined = () => {
  return typeof localStorage !== 'undefined';
};

export enum LocalStorageTypes {
  theme = 'theme',
}
