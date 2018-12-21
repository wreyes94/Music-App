export const StorageHelper = {
  getLocal: <T>(key: string): T => {
    return JSON.parse(localStorage.getItem(key));
  },

  setLocal: (key: string, value: any): any => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeLocal: (key: string) => {
    localStorage.removeItem(key);
  }
};
