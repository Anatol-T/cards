import React, {useEffect, useState} from 'react';
import styles from './PacksList.module.css'
import Header from "../../main/ui/header/Header";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import PacksTable from "./PacksTable/Table/PacksTable";
import {PackFrame} from "../../main/ui/common/PackFrame/PackFrame";
import Sidebar from "../../main/ui/Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import {addPackTC, changeCurrentPageAC, fetchPacksListsTC, setPageCountAC} from "../../main/bll/cardsPackReducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../main/ui/routes/Routes";
import {Pagination} from "../../main/ui/common/Pagination/Pagination";
import {PageSizeSelector} from "../../main/ui/common/pageSizeSelector/PageSizeSelector";
import {PacksSearch} from "../../main/ui/common/GridinSearch/PacksSearch";
import Modal from "../../main/ui/common/Modal/Modal";
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText";
import ModalButtonsWrap from "../../main/ui/common/Modal/ModalButtonsWrap";
import {setErrorAC} from "../../main/bll/appReducer";
import SuperCheckbox from "../../main/ui/common/SuperCheckbox/SuperCheckbox";

const PacksList = () => {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string>(state => state.app.error);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.status);
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const debouncingFlag = useSelector<AppRootStateType, object>(state => state.cardsPack.debouncingFlag)
    //const max = useSelector<AppRootStateType, number>(state => state.cardsPack.max)
    const page = useSelector<AppRootStateType, number>(state => state.cardsPack.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cardsPack.pageCount)
    const myPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPack.myPacks)
    const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.cardsPack.cardPacksTotalCount)
    const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName)

    const [newPackName, setNewPackName] = useState<string>('');
    const [privateValue, setPrivateValue] = useState<boolean>(false);
    const [isModal, setIsModal] = useState<boolean>(false);

    const showModal = () => setIsModal(true);
    const closeModal = () => setIsModal(false);

    useEffect(() => {
        if (!isLoading) {
            dispatch(fetchPacksListsTC())
        }
    }, [page, pageCount, myPacks, sortPacks, packName, debouncingFlag])

    useEffect(() => {
        return () => {
            if (error.length > 0) dispatch(setErrorAC(''))
        }
    })


    const pageSizeHandler = (value: number) => {
        if (!isLoading) dispatch(setPageCountAC(value))
    }
    const onChangedPage = (newPage: number) => {
        if (isLoading) return
        if (newPage !== page) dispatch(changeCurrentPageAC(newPage))
    }
    const addPack = () => {
        dispatch(addPackTC(newPackName, privateValue))
        setNewPackName('')
        setPrivateValue(false)
        closeModal()
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <Header/>
            <PackFrame>
                <Sidebar/>
                <div className={styles.main}>
                    <h2>Packs list</h2>
                    <div className={styles.topPanel}>
                        <div className={styles.search}>
                            <PacksSearch/>
                        </div>
                        <SuperButton onClick={showModal} className={styles.addBtn}>Add new pack</SuperButton>
                    </div>
                    {error ? <div style={{color: 'red'}}>{error}</div> : ''}
                    <PacksTable/>
                    <div className={styles.paginationWrapper}>
                        {
                            cardPacksTotalCount < pageCount
                                ? <></>
                                : <>
                                    <Pagination totalCount={cardPacksTotalCount}
                                                pageSize={pageCount}
                                                currentPage={page}
                                                onChangedPage={onChangedPage}/>
                                    <PageSizeSelector
                                        totalCount={cardPacksTotalCount}
                                        pageCount={pageCount}
                                        handler={pageSizeHandler}/>
                                </>
                        }
                    </div>
                </div>
            </PackFrame>
            <Modal title={'Add new pack'} show={isModal} closeModal={closeModal}>
                <label>Name pack</label>
                <SuperInputText value={newPackName} onChangeText={setNewPackName} placeholder={'Enter pack name'}/>
                <div className={styles.containerCheckBox}>
                    <SuperCheckbox checked={privateValue} onChangeChecked={setPrivateValue}/>
                    <span>Private Pack</span>
                </div>
                <ModalButtonsWrap closeModal={closeModal}>
                    <SuperButton onClick={addPack}>Save</SuperButton>
                </ModalButtonsWrap>
            </Modal>
        </>
    );
};

export default PacksList;