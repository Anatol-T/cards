import React, {ChangeEvent, useState} from "react";
import s from './PackSearch.module.css'
import {useDispatch} from "react-redux";

import {changeCurrentPageCardsAC, setFilterReducerAC} from "../../../bll/cardsReducer";
import {useParams} from "react-router-dom";

import Background from "./IconSearch.svg";


export const CardsSearch = () => {
    // const cardQuestion = useSelector<AppRootStateType, string>(state => state.cards.cardQuestion);
    //  const cardAnswer = useSelector<AppRootStateType, string>(state => state.cards.cardAnswer);
    const {packId} = useParams()
    const dispatch = useDispatch()


    let [event, setEvent] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent(e.currentTarget.value)

    };
    let BtnHandler = () => {
        dispatch(setFilterReducerAC(event)); dispatch(changeCurrentPageCardsAC(1))
    }
    return (
        <div className={s.wrap}>
            <input
                type="text"
                placeholder="Search..."

                value={event}
                onChange={handleChange}
            />
            <button onClick={BtnHandler} className={s.btnSearch}></button>
        </div>
    );
}