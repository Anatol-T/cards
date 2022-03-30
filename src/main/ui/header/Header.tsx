import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";
import styles from './Header.module.css';
import profileIcon from '../../../assets/images/Profile.svg';
import packsListIcon from '../../../assets/images/Packs.svg';
import {logoutTC} from "../../bll/loginReducer";
import {useDispatch} from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <header className={styles.header}>
      <nav>
        <NavLink to={PATH.PACKS} className={(navData) => navData.isActive ? styles.isActive : ""}>
          <div className={styles.packsLink}><img src={packsListIcon}
                                                 alt={'packsListIcon'}/><span>Packs list</span></div>
        </NavLink>
        <NavLink to={PATH.PROFILE} className={(navData) => navData.isActive ? styles.isActive : ""}>
          <div className={styles.profileLink}><img src={profileIcon} alt={'profileIcon'}/><span>Profile</span>
          </div>
        </NavLink>
          <div className={styles.btnLogoutContainer}>
              <button className={styles.btnLogout} onClick={logOutHandler}>Log Out</button>
          </div>
      </nav>
    </header>
  )
};

export default Header;