import React, {ChangeEvent, useState, KeyboardEvent, useEffect} from "react";
import s from './PackSearch.module.css'
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentPageAC, setFilteredPacksAC} from "../../../bll/cardsPackReducer";
import {AppRootStateType} from "../../../bll/store";


export const PacksSearch = () => {
    const dispatch = useDispatch()
    const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.packName)
    //const myPacks = useSelector<AppRootStateType, boolean>(state => state.cardsPack.myPacks);
    const [event, setEvent] = useState<string>('')

    let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent(e.currentTarget.value)
    };
    useEffect(() => {
        if (packName !== event) setEvent(packName)
    }, [packName])
    // useEffect(() => {
    //     setEvent('')
    // }, [myPacks])

    let BtnHandler = () => {
        dispatch(setFilteredPacksAC(event))
        dispatch(changeCurrentPageAC(1))
    }

    const onKeyPressBtnHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            BtnHandler()
        }
    }


    return (
        <div className={s.wrap}>
            <input
                onKeyPress={onKeyPressBtnHandler}
                type="text"
                placeholder="Search..."
                value={event}
                onChange={handleChange}
            />
            <button onClick={BtnHandler} className={s.btnSearch}> </button>
        </div>
    );
}

