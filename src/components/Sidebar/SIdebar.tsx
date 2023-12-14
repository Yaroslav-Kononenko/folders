import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { Explorer } from "../Explorer";
import { Tree } from "../../static/dataTypes";
import data from "../../static/data-v2.json";
import { observer } from "mobx-react-lite";
import fileTreeStore from "../../store/store";

const initialFileTree: Tree = {
  items: [{
    name: "",
    path: "",
    contentType: "directory"
  }],
}

export interface ItemType {
  name: string;
  path: string;
  contentType: string;
  items?: ItemType[];
}

export const Sidebar: React.FC = observer(() => {
  const [list, setList] = useState<Tree>(initialFileTree);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const searchInItems = (searchText: string, items: ItemType[]): ItemType[] => {
      let results: ItemType[] = [];

      if(searchText.length === 0) {
        return results;
      }

      items.forEach((item) => {
        if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
          results.push(item);
        }

        if (item.items) {
          const subResults = searchInItems(searchText, item.items);
          results = results.concat(subResults);
        }
      });

      return results;
    };

    const timerId = setTimeout(() => {
      const results = searchInItems(searchText, list.items);
      fileTreeStore.updateSearchResults(results);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchText, list.items]);

  useEffect(() => {
    setList(data.payload.fileTree);
  }, [])

  return (
    <div className={styles.sidebar}>
      <label htmlFor="searchText">
        <div className={styles.searchbar}>
          <input
            type="text"
            name="searchText"
            id="searchText"
            placeholder="Search"
            className={styles.searchbar__input}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </label>

      <Explorer data={list} />
    </div>
  );
});

