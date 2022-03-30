import {instance} from "./authAndProfileApi";

export const cardsApi = {
    getCards(params: Partial<GetCardsParamsType>) {
        console.log(params)
        return instance.get('/cards/card', {params: {...params}});
    },
    addCard: (newCard: addCardType) => {
        return instance.post('/cards/card', {card: {...newCard}})
    },
    deleteCard: (id: string) => {
        return instance.delete('/cards/card', {params: {id: id}})
    },
    updateCard: (UpdatedCard: Partial<CardType>) => {
        return instance.put('/cards/card', {card: {...UpdatedCard}})
    },
    updateCardsGrade: (updatedGrade: Partial<GetCardsGrade>) => {
        return instance.put<CardsGradeResponseType>('/cards/grade', updatedGrade)
    },
}

export type GetCardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string // обязательно!
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}

export type CardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    token: string
    tokenDeathTime: number
}

export type CardType = {
    _id: string
    cardsPack_id: string  // ОБЯЗАТЕЛЬНОЕ ЗНАЧЕНИЕ ДЛЯ ДОБАВЛЕНИЯ И ИЗМЕНЕНИЯ
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: 0,
    answerImg: string
    answerVideo: string
    questionImg: string
    questionVideo: string
}

export type GetCardsGrade = {
    grade: number
    card_id: string
}
export type CardsGradeResponseType = {
    token: string
    tokenDeathTime: number
    updatedGrade: updatedGradeType
}
export type updatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

export type addCardType = {
    cardsPack_id?: string;
    question?: string;
    answer?: string;
    grade?: number;
    shots?: number;
    answerImg?: string;
    questionImg?: any;
    questionVideo?: string;
    answerVideo?: string;
}