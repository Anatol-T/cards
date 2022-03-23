import React from 'react';
import styles from "./Modal.module.css";
import SuperButton from "../SuperButton/SuperButton";

type PropsType = {
    children: React.ReactNode
    closeModal: () => void
}

const ModalButtonsWrap = (props: PropsType) => {
    return (
        <div className={styles.modalButtons}>
            <SuperButton onClick={props.closeModal} light={true}>Cancel</SuperButton>
            {props.children}
        </div>
    );
};

export default ModalButtonsWrap;