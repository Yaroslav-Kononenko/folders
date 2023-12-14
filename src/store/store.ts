import { makeAutoObservable } from 'mobx';
import { ItemType } from '../static/dataTypes';

class FileTreeStore {
  chosenList = {
    path: '',
    items: [] as ItemType[],
  };

  searchResults = [] as ItemType[];

  constructor() {
    makeAutoObservable(this);
  }

  updateChosenList(path: string, items: ItemType[]) {
    this.chosenList = {
      path,
      items,
    };
  }

  updateSearchResults(items: ItemType[]) {
    this.searchResults = items;
  }
}

const fileTreeStore = new FileTreeStore();
export default fileTreeStore;