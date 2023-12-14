import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import styles from "./Layout.module.scss";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({children}) => {
  return(
    <div className={styles.layout}>
      <Header />
      <div className={styles.mainPart}>
        <Sidebar />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
