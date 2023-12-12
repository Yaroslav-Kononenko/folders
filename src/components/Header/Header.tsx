import styles from "./Header.module.scss";
import image from "../../assets/header/avatar.png"
import switcher from "../../assets/header/lang_arrow.svg";
import notifications from "../../assets/header/notification.svg";
import React from "react";

export const Header: React.FC = React.memo(() => {
  return(
    <header className={styles.header}>
      <label htmlFor="searchText">
        <div className={styles.searchbar}>
          <input type="text" name="searchText" id="searchText" placeholder="Search" className={styles.searchbar__input} />
        </div>
      </label>

      <div className={styles.userbar}>
        <div className={styles.indicators}>
          <div className={styles.langbar}>
            <span className={styles.langbar__text}>
              en
            </span>

            <div className={styles.langbar__switcher}>
              <img src={switcher} alt="language_switcher" />
            </div>
          </div>

          <div className={styles.notifications}>
              <img src={notifications} alt="notification_icon" className={styles.notifications__img} /> 
          </div>
        </div>

        <div className={styles.userdata}>
          <div className={styles.userdata_text}>
            <div className="">
              <span className={styles.username}>
                {`Yarek`}
              </span>
            </div>

            <div className="">
              <span className={styles.userstatus}>
                {`Admen`}
              </span>
            </div>
          </div>

          <div className={styles.avatar_container}>
            <img src={image} alt="avatar" className={styles.avatar} />

            <div className={styles.status_pointer}></div>
          </div>
        </div>
      </div>
    </header>
  );
});
