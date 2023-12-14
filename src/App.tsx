import styles from "./App.module.scss";
import { observer } from "mobx-react-lite";
import fileTreeStore from "./store/store";
import { ItemType } from "./static/dataTypes";
import folder from "./assets/folders/active_folder.webp";
import file from "./assets/folders/files.webp";

const App: React.FC = observer(() => {
  const handleItemClick = (path: string, items: ItemType[]) => {
    fileTreeStore.updateChosenList(path, items);
  };

  const listRender = (result: ItemType) => {
    const img = result.contentType === "file" ? file : folder;

    return(
      <li
        key={result.path}
        className={styles.list__item}
        onClick={() => handleItemClick(result.path, result.items)}
      >
        <div className={`${styles.container}`}>
          <img className={styles.img} src={img} alt="icon" />
        </div>

        <span>{result.name}</span>
      </li>
    )
  }

  return (
    <div className={styles.app}>
      <h3 className={styles.app__path}>
        Search results: 
      </h3>

      <ul className={styles.list}
      >
        {fileTreeStore?.searchResults?.map(listRender)}
      </ul>

      <h3 className={styles.app__path}>
        Chousen name: <span className={styles.accent}>{fileTreeStore.chosenList.path}</span>  
      </h3>

      {fileTreeStore.chosenList.items?.map(listRender)}
    </div>
  );
});

export default App;
