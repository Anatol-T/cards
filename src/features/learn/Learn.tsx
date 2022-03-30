import React, {useEffect, useState} from 'react';
import Header from "../../main/ui/header/Header";
import {Frame} from "../../main/ui/common/Frame/Frame";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import {PATH} from "../../main/ui/routes/Routes";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/bll/store";
import {CardType} from "../../main/dal/cardsApi";
import SuperRadio from "../../main/ui/common/SuperRadio/SuperRadio";
import stl from './Learn.module.css'
import Preloader from "../../main/ui/common/Preloader/Preloader";
import {CardsGradeTC, clearCardsAC, learnCardsTC} from "../../main/bll/cardsReducer";


const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

const initialState: CardType = {
    _id: "", cardsPack_id: "", user_id: "",
    answer: "", question: "", grade: 0,
    shots: 0, comments: "", type: "",
    rating: 0, more_id: "", created: "",
    updated: "", __v: 0, answerImg: "",
    answerVideo: "", questionImg: "", questionVideo: "",
}

const btnStyle = {
    width: '150px',
    padding: '0'
}

export const Learn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {packId} = useParams<{ packId: string }>()

    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const packName = useSelector<AppRootStateType, string>(state => state.cardsPack.cardPacks.filter((p: any) => p._id === packId)[0]?.name)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [rating, setRating] = useState("")
    const [card, setCard] = useState<CardType>(initialState);

    useEffect(() => {
        packId && dispatch(learnCardsTC(packId))
        return () => {
            dispatch(clearCardsAC())
        }
    }, [])

    useEffect(() => {
        if (cards.length > 0) setCard(getCard(cards));
        console.log(cards)
    }, [cards])

    const onNext = () => {
        if (rating) {
            setIsChecked(false);
            setRating("")

            dispatch(CardsGradeTC(card._id, grades.findIndex(el => el === rating) + 1))
        }
    }

    const cancelHandler = () => {
        navigate(PATH.PACKS, {replace: true})
    }

    return (
        <>
            <Header/>
            {loading
                ? <Preloader/>
                : <Frame>
                    <h2>Learn "{packName}"</h2>
                    <div>
                        <div className={stl.block}><b>Question:</b> {card.question}</div>

                        {isChecked && (
                            <>
                                <div className={stl.radioBlock}>
                                    <div className={`${stl.gap} ${stl.block}`}><b>Answer: </b> {card.answer}
                                    </div>
                                    <div><b>Rate yourself:</b></div>
                                    <SuperRadio
                                        name={'radio'}
                                        options={grades}
                                        value={rating}
                                        onChangeOption={setRating}
                                    />
                                </div>


                            </>
                        )}
                    </div>
                    <div className={stl.btnBlock}>
                        <SuperButton onClick={cancelHandler} light={true}>Cancel</SuperButton>
                        {
                            isChecked
                                ? <SuperButton onClick={onNext} disabled={!rating}>Next</SuperButton>
                                :
                                <SuperButton onClick={() => setIsChecked(true)} style={btnStyle}>Show
                                    answer</SuperButton>
                        }
                    </div>
                </Frame>}
        </>
    );
};
