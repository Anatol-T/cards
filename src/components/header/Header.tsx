import React from 'react';
import { NavLink } from 'react-router-dom';
import {PATH} from "../../main/RoutesTo";

export function Header() {
  return (
    <header>
      <nav>
        <div >
          <NavLink to={PATH.PROFILE}>Profile &nbsp;</NavLink>
          <NavLink to={PATH.LOGIN}>Log in&nbsp;</NavLink>
          <NavLink to={PATH.SIGN_UP}>Join now&nbsp;</NavLink>
          <NavLink to={PATH.RESET_PASSWORD}>Restore password&nbsp;</NavLink>
          <NavLink to={PATH.DEMO}>Demo page&nbsp;</NavLink>
        </div>
      </nav>
    </header>
  );
}

