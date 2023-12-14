import styles from "./Explorer.module.scss";
import { Tree, ItemType } from "../../static/dataTypes";
import React, { useState } from "react";
import arrow from "../../assets/folders/play.webp";
import folder from "../../assets/folders/active_folder.webp";
import activeFolder from "../../assets/folders/folder.webp";
import file from "../../assets/folders/files.webp";
import { observer } from 'mobx-react-lite';
import fileTreeStore from "../../store/store";

type Props = {
  data: Tree;
}

export const Explorer: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.list}>
      {data.items?.map((rowData) =>
        <ExplorerItem key={rowData.path} itemData={rowData} />
      )}
    </div>
  );
};

type ItemProps = {
  itemData: ItemType;
}

const ExplorerItem: React.FC<ItemProps> = observer(({itemData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleItemClick = (path: string, items: ItemType[]) => {
    fileTreeStore.updateChosenList(path, items);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const isFolder = itemData.contentType === "directory";

  let img = file;
  if (isFolder) {
    img = isOpen? folder : activeFolder;
  }

  const emptyFolder = isFolder && !itemData.items;

  return (
    <div>
      <div
        onClick={() => handleItemClick(itemData.path, itemData.items)}
        className={`
          ${styles.list__item}
          ${!isFolder && styles.file_left_padding}
          ${isOpen && styles.isOpen}
        `}
      >
        {isFolder && itemData.items && (
          <div className={styles.container} onClick={handleToggle}>
            <img className={`${styles.arrowImg} ${isOpen && styles.rotate}`} src={arrow} alt=">" />
          </div>
        )}

        <div className={`${styles.container} ${emptyFolder ? styles.noArrow : ""}`}>
          <img className={styles.img} src={img} alt="icon" />
        </div>

        <span>{itemData.name}</span>
      </div>

      {isOpen && itemData.items && (
        <ul className={styles.dataList}>
          {itemData.items.map((item: ItemType) => (
            <li key={item.path}>
              <ExplorerItem itemData={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
