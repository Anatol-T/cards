import React from 'react';
import styles from './Frame.module.css';

type PropsType = {
    children: React.ReactNode
}
export const Frame = (props: PropsType) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.frame}>
                {props.children}
            </div>
        </div>
    );
};
