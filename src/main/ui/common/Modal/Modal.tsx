import React from 'react';
import styles from './Modal.module.css';

type PropsType = {
    title?: string
    show: boolean
    closeModal: () => void
    children: React.ReactNode
}

const Modal = (props: PropsType) => {

    if (!props.show) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={props.closeModal}/>
            <div className={styles.dialog}>
                {props.title && <h3>{props.title}</h3>}
                <div className={styles.content}>{props.children}</div>
                <button className={styles.close} onClick={props.closeModal}>x</button>
            </div>
        </div>
    );
};

export default Modal;

