import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import drinkIc from "../../assets/icons/ic-drink.svg";
import addIc from "../../assets/icons/ic-add.svg";
const Navbar: React.FC = () => {
  return (
    <nav >
      <div className={styles.navbar}>
        <span>Exodigo - happy hour</span>
        <div className={styles.actionBtns}>
          <Link to="/new-drink-form">
            <img src={addIc} alt="new drink from icon" />
          </Link>
          <Link to="/">
            <img src={drinkIc} alt="home page icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
