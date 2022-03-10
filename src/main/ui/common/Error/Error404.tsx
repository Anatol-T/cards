import React from 'react';
import s from './error404.module.css'
import SuperButton from "../SuperButton/SuperButton";

export const Error404 = () => {
    return (
        <div className={s.container}>
            <p>Opps! Page Not Found.</p>
            <SuperButton>Back to home</SuperButton>
        </div>
    );
};