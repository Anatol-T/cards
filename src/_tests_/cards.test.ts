import {
    cardsReducer,
    changeCurrentPageCardsAC,
    InitialStateType,
    setFilterReducerAC,
    sortCardsAC
} from "../main/bll/cardsReducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 1,
        pageCount: 8,
        searchCard: '',
        sortCards: '0updated',
        packUserId: '',
        token: '',
        tokenDeathTime: 0,
        cardAnswer: "",
        cardQuestion: '',
        grade: 0,
    }
})

test('correct change sortCards', () => {
    const endState = cardsReducer(startState, sortCardsAC('1updated'))
    expect(endState.sortCards).toBe('1updated');
});

test('correct changeCurrentPage', () => {
    const endState = cardsReducer(startState, changeCurrentPageCardsAC(3))
    expect(endState.page).toBe(3);
});

test('correct search', () => {
    const endState = cardsReducer(startState, setFilterReducerAC('new'))
    expect(endState.cardQuestion).toBe('new');
});
