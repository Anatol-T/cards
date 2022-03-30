import React, {useState} from 'react';
import styles from "./CardsTable.module.css";
import {CardType} from "../../../../main/dal/cardsApi";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {SuperLoading} from "../../../../main/ui/common/Loading/loading";
import {deleteCardTC, updateCardTC} from "../../../../main/bll/cardsReducer";
import {useParams} from "react-router-dom";
import Modal from "../../../../main/ui/common/Modal/Modal";
import ModalButtonsWrap from "../../../../main/ui/common/Modal/ModalButtonsWrap";
import SuperButton from "../../../../main/ui/common/SuperButton/SuperButton";
import SuperTextArea from "../../../../main/ui/common/SuperTextArea/SuperTextArea";

type CardPropsType = {
    card: CardType
    isCheckId: boolean
    classMyCards: string
}

const Card: React.FC<CardPropsType> = ({card, isCheckId, classMyCards}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const [year, month, day] = card.updated.slice(0, 10).split('-')
    let rating = +card.grade.toFixed(0)
    const finalClass1 = `${1 <= rating ? `${styles.active}` : ``}`
    const finalClass2 = `${2 <= rating ? `${styles.active}` : ``}`
    const finalClass3 = `${3 <= rating ? `${styles.active}` : ``}`
    const finalClass4 = `${4 <= rating ? `${styles.active}` : ``}`
    const finalClass5 = `${5 <= rating ? `${styles.active}` : ``}`
    const {packId} = useParams<{ packId: string }>();
    const currId = packId ? packId : ''

    const [newQuestion, setNewQuestion] = useState<string>(card.question);
    const [newAnswer, setNewAnswer] = useState<string>(card.answer);
    const [isShownModal, setIsShownModal] = useState<boolean>(false)

    const [modalType, setModalType] = useState<'Delete' | 'Edit' | ''>('');
    const closeModal = () => setIsShownModal(false)
    const showModal = (modalType: 'Delete' | 'Edit' | '') => {
        setIsShownModal(true)
        setModalType(modalType)
    }

    const deleteCard = () => {
        setIsShownModal(false)
        dispatch(deleteCardTC(currId, card._id))
    }

    const updateCard = () => {
        dispatch(updateCardTC(currId, card._id, newQuestion, newAnswer))
        closeModal()
    }

    if (isLoading) {
        return <SuperLoading/>
    }

    return (
        <div className={`${styles.card} ${classMyCards}`}>
            <div>{card.question}</div>
            <div>{card.answer}</div>
            <div>{`${day}.${month}.${year}`}</div>
            <div>
                <div className={styles.rating_result}>
                    <span className={finalClass1}></span>
                    <span className={finalClass2}></span>
                    <span className={finalClass3}></span>
                    <span className={finalClass4}></span>
                    <span className={finalClass5}></span>
                </div>
            </div>
            {
                isCheckId && <div className={styles.buttons}>
                    <>
                        <button className={`${styles.button} ${styles.delete}`}
                                onClick={() => showModal('Delete')}>Delete
                        </button>
                        <button className={styles.button} onClick={() => showModal('Edit')}>Edit</button>
                    </>
                </div>
            }
            {modalType === 'Delete' &&
            <Modal title={'Delete Card'} show={isShownModal} closeModal={closeModal}>
                <p>Do you really want to remove Card?</p>
                <ModalButtonsWrap closeModal={closeModal}>
                    <SuperButton onClick={deleteCard} red={true}>Delete</SuperButton>
                </ModalButtonsWrap>
            </Modal>
            }
            {modalType === 'Edit' &&
            <Modal title={'Edit Card'} show={isShownModal} closeModal={closeModal}>
                <div className={styles.textArea}>
                    <label>New Question</label>
                    <SuperTextArea value={newQuestion} onChangeText={setNewQuestion}/>
                </div>
                <div className={styles.textArea}>
                    <label>New Answer</label>
                    <SuperTextArea value={newAnswer} onChangeText={setNewAnswer}/>
                </div>
                <ModalButtonsWrap closeModal={closeModal}>
                    <SuperButton onClick={updateCard}>Save</SuperButton>
                </ModalButtonsWrap>
            </Modal>
            }
        </div>
    );
};

export default Card;