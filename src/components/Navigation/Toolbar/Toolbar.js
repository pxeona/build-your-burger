import React from "react";

import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = () => (
  <header className={styles.Toolbar}>
    <div>MENU</div>
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.mobileOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
