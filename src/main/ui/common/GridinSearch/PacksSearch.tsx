import React, {ChangeEvent, useState} from "react";
import s from './PackSearch.module.css'
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {changeCurrentPageAC, setFilteredPacksAC} from "../../../bll/cardsPackReducer";
import Background from './IconSearch.svg'


export const PacksSearch = () => {
   // const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName);
    const dispatch = useDispatch()
    const {packId} = useParams()

    let [event, setEvent] = useState<string>('')

    let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent(e.currentTarget.value)

    };

    let BtnHandler = () => {
        dispatch(setFilteredPacksAC(event))
        dispatch(changeCurrentPageAC(1))
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

