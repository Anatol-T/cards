import React, {useState} from 'react';
import styles from "./PacksTable.module.css";
import {NavLink} from "react-router-dom";
import {PackType} from "../../../../main/dal/cardsPackApi";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {deletePackTC, editPackTC} from "../../../../main/bll/cardsPackReducer";
import {SuperLoading} from "../../../../main/ui/common/Loading/loading";
import Modal from "../../../../main/ui/common/Modal/Modal";
import SuperButton from "../../../../main/ui/common/SuperButton/SuperButton";
import SuperInputText from "../../../../main/ui/common/SuperInputText/SuperInputText";
import ModalButtonsWrap from "../../../../main/ui/common/Modal/ModalButtonsWrap";


type PackPropsType = {
    pack: PackType
}

const Pack: React.FC<PackPropsType> = ({pack}) => {
    const dispatch = useDispatch();
    const myUserId = useSelector<AppRootStateType, string>(state => state.profilePage._id)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    const [newPackName, setNewPackName] = useState<string>(pack.name);
    const [isShownModal, setIsShownModal] = useState<boolean>(false)

    const [modalType, setModalType] = useState<'Delete' | 'Edit' | ''>('');
    const closeModal = () => setIsShownModal(false)
    const showModal = (modalType: 'Delete' | 'Edit' | '') => {
        setIsShownModal(true)
        setModalType(modalType)
    }

    const deletePack = () => {
        setIsShownModal(false)
        dispatch(deletePackTC(pack._id))
    }

    const editPack = () => {
        dispatch(editPackTC(pack._id, newPackName))
        closeModal()
    }


    if (isLoading) {
        return <SuperLoading/>
    }

    return (
        <div className={`${styles.pack} ${styles.item}`}>
            <NavLink to={`/cards/${pack._id}`}>
                {pack.name}
            </NavLink>
            <div>{pack.cardsCount}</div>
            <div>{pack.updated.slice(0, 10)}</div>
            <div>{pack.user_name}</div>
            <div className={styles.buttons}>
                {
                    myUserId === pack.user_id && <>
                        <button className={`${styles.button} ${styles.delete}`}
                                onClick={() => showModal('Delete')}>Delete
                        </button>
                        <button className={styles.button} onClick={() => showModal('Edit')}>Edit</button>
                    </>
                }
                <NavLink to={`/learn/${pack._id}`}
                         className={`${!pack.cardsCount ? styles.disabled : ''} ${styles.button}`}>Learn</NavLink>
            </div>
            {modalType === 'Delete' &&
            <Modal title={'Delete Pack'} show={isShownModal} closeModal={closeModal}>
                <p>Do you really want to remove Pack Name - {pack.name}?
                    All cards will be excluded from this course.</p>
                <ModalButtonsWrap closeModal={closeModal}>
                    <SuperButton onClick={deletePack} red={true}>Delete</SuperButton>
                </ModalButtonsWrap>
            </Modal>
            }
            {modalType === 'Edit' &&
            <Modal title={'Edit Pack'} show={isShownModal} closeModal={closeModal}>
                <label>New name</label>
                <SuperInputText value={newPackName} onChangeText={setNewPackName}/>
                <ModalButtonsWrap closeModal={closeModal}>
                    <SuperButton onClick={editPack}>Save</SuperButton>
                </ModalButtonsWrap>
            </Modal>
            }
        </div>
    );
};

export default Pack;