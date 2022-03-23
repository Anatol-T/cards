import React, {useEffect} from 'react';
import s from './error404.module.css'
import SuperButton from "../SuperButton/SuperButton";
import {PATH} from "../../routes/Routes";
import {NavLink} from "react-router-dom";

export const Error404 = () => {

    return (
        <div className={s.container}>
            <p>Opps! Page Not Found.</p>
            <NavLink to={PATH.PROFILE}><SuperButton>Back to home</SuperButton></NavLink>
        </div>
    );
};