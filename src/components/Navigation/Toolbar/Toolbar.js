import React from "react";

import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import HamburgerMenu from "./HamBurgerMenu/HamBurgerMenu";

const toolbar = (props) => (
  <header className={styles.Toolbar}>
    <HamburgerMenu clicked={props.clicked} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.mobileOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
