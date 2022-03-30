import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './PackSearch.module.css'
import {useDispatch} from "react-redux";

import {changeCurrentPageCardsAC, setFilterReducerAC} from "../../../bll/cardsReducer";
import {useParams} from "react-router-dom";




export const CardsSearch = () => {
    const {packId} = useParams()
    const dispatch = useDispatch()


    let [event, setEvent] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent(e.currentTarget.value)

    };
    let BtnHandler = () => {
        dispatch(setFilterReducerAC(event));
        dispatch(changeCurrentPageCardsAC(1))
    }
    const onKeyPressBtnHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            BtnHandler()
        }
    }

    return (
        <div className={s.wrap}>
            <input
                type="text"
                placeholder="Search..."
                onKeyPress={onKeyPressBtnHandler}
                value={event}
                onChange={handleChange}
            />
            <button onClick={BtnHandler} className={s.btnSearch}></button>
        </div>
    );
}