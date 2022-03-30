import React, {useEffect, useState} from 'react';
import styles from "./Sidebar.module.css";
import {DoubleCheckbox} from "../common/GridinCheckbox/DoubleCheckbox";
import stl from "../common/SuperRange/RangeDemo.module.css";
import SuperDoubleRange from "../common/SuperRange/common/c8-SuperDoubleRange/SuperDoubleRange";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {setDebouncingFlagAC, setMaxAC, setMinAC} from "../../bll/cardsPackReducer";

const Sidebar = () => {
    const dispatch = useDispatch()
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.cardsPack.maxCardsCount)
    const max = useSelector<AppRootStateType, number>(state => state.cardsPack.max)
    const min = useSelector<AppRootStateType, number>(state => state.cardsPack.min)
    const [id, setId] = useState(0)
    useEffect(() => {
        dispatch(setMaxAC(maxCardsCount))
    }, [maxCardsCount])

    const onChangeDoubleRanger = (value: [number, number]) => {
        if (value[0] !== min) dispatch(setMinAC(value[0]))
        if (value[1] !== max) dispatch(setMaxAC(value[1]))
        clearTimeout(id)
        const x = +setTimeout(() => {
            //dispatch(fetchPacksListsTC())
            dispatch(setDebouncingFlagAC())
        }, 1500)
        setId(x)
    }

    return (
        <div className={styles.sidebar}>
            <div>
                <p>Show packs cards</p>
                <DoubleCheckbox/>
            </div>
            <div className={styles.containerNumberOfCards}>
                <p>Number of cards</p>
                <div className={stl.container}>
                    <span>{min}</span>
                    <SuperDoubleRange
                        value={[min, max]}
                        max={maxCardsCount}
                        onChangeRange={onChangeDoubleRanger}
                    />
                    <span>{max}</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;