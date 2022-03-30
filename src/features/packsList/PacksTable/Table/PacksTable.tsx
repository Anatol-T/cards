import React from 'react';
import styles from './PacksTable.module.css'
import Pack from "./Pack";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";
import {PackType} from "../../../../main/dal/cardsPackApi";
import {sortPacksAC} from "../../../../main/bll/cardsPackReducer";
import {sortFields} from "../../../../utilits/functionsCommon/sortingField";


const PacksTable = () => {
    const dispatch = useDispatch();
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.cardsPack.cardPacks)
    const sortPacks = useSelector<AppRootStateType, string>(state => state.cardsPack.sortPacks)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    const direction = sortPacks[0]
    const activeField = sortPacks.slice(1)
    const rotate = direction === "1" ? styles.up : ""

    const sortFieldsPack = (field: string) => sortFields(field, sortPacksAC, isLoading, sortPacks, dispatch)

    const sortUpdate = () => sortFieldsPack('updated')
    const sortName = () => sortFieldsPack('name')
    const sortCards = () => sortFieldsPack('cardsCount')
    const sortUserName = () => sortFieldsPack('user_name')

    return (
        <div className={styles.table}>
            <div className={`${styles.header} ${styles.item}`}>
                <div onClick={sortName} className={activeField === "name" ? `${styles.active} ${rotate}` : ""}>Name
                </div>
                <div onClick={sortCards}
                     className={activeField === "cardsCount" ? `${styles.active} ${rotate}` : ""}>Cards
                </div>
                <div onClick={sortUpdate} className={activeField === "updated" ? `${styles.active} ${rotate}` : ""}>Last
                    Updated
                </div>
                <div onClick={sortUserName}
                     className={activeField === "user_name" ? `${styles.active} ${rotate}` : ""}>Created by
                </div>
                <div>Actions</div>
            </div>
            {packs.length > 0
                ? packs.map(pack => <Pack key={pack._id} pack={pack}/>)
                : <div style={{padding: '16px 24px'}}>Ничего не найдено</div>}
        </div>
    );
};

export default PacksTable;