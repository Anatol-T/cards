import React from 'react';
import styles from './PackFrame.module.css';

type PropsType = {
    children: React.ReactNode
}
export const PackFrame = (props: PropsType) => {
    return (
        <div className={styles.packFrame}>
            {props.children}
        </div>
    );
};
