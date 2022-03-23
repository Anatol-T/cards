import React from "react";
import s from './DoubleCheckbox.module.css'
import {setMyPacksAC} from "../../../bll/cardsPackReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";


export const DoubleCheckbox = () => {
    const myPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPack.myPacks);
    const dispatch = useDispatch()

    const myOnClickHandler = () => {
        dispatch(setMyPacksAC(true))
    }
    const allOnClickHandler = () => {
        dispatch(setMyPacksAC(false))
    }

    return (
        <div className={s.label}>
            <div onClick={myOnClickHandler} className={myPacks ? s.selected : s.tab}>
                <h5>My</h5>
            </div>
            <div onClick={allOnClickHandler} className={!myPacks ? s.selected : s.tab}>
                <h5>All</h5>
            </div>
        </div>
    )
}