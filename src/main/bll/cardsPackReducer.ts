// КОЛОДЫ
import {cardsPackApi, PacksResponseType, PackType} from "../dal/cardsPackApi";
import {setErrorAC, setLoadingAC} from "./appReducer";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunkType} from "./store";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 8,
    myPacks: false,
    sortPacks: "0updated",
    min: 0,
    max: 0,
    packName: '',
    user_id: '',
    debouncingFlag: {},
}

export const cardsPackReducer = (state: InitialStateType = initialState, action: CardsPackActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS_LIST':
            return {...state, ...action.data}
        case 'PACKS/SORT':
            return {...state, sortPacks: action.sortPacks, page: 1}
        case 'PACKS/SET_MY_PACKS':
            return {
                ...state,
                myPacks: action.myPacks,
                min: 0,
                max: 0,
                packName: ''
            }
        case "PACKS/CHANGE_CURRENT_PAGE":
            return {...state, page: action.page}
        case "PACKS/SET_MIN":
            return {...state, min: action.min}
        case "PACKS/SET_MAX":
            return {...state, max: action.max}
        case "PACKS/SET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount, page: 1}
        case "PACKS/SET_FILTERED_PACKS":
            return {...state, packName: action.packName}
        case "PACKS/SET_DEBOUNCING_FLAG":
            return {...state, debouncingFlag: {}, page: 1}
        default:
            return state
    }
};

// type
type InitialStateType = {
    cardPacks: Array<PackType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    myPacks: boolean
    sortPacks: string
    min: number
    max: number
    packName: string
    user_id: string
    debouncingFlag: object
}

export type CardsPackActionsType = SetPacksListsACType | SortPacksACType | SetMyPacksACType | setFilteredPacksACType
    | ChangeCurrentPageACType | SetMinACType | SetMaxACType | SetPageCountACType | SetDebouncingFlagACType
// Action creators
export const setPacksListsAC = (data: PacksResponseType) =>
    ({type: 'PACKS/SET_PACKS_LIST', data} as const)

type SetPacksListsACType = ReturnType<typeof setPacksListsAC>

export const sortPacksAC = (sortPacks: string) =>
    ({type: 'PACKS/SORT', sortPacks} as const)

type SortPacksACType = ReturnType<typeof sortPacksAC>

export const setMyPacksAC = (myPacks: boolean) =>
    ({type: 'PACKS/SET_MY_PACKS', myPacks} as const)

type SetMyPacksACType = ReturnType<typeof setMyPacksAC>

export const changeCurrentPageAC = (page: number) =>
    ({type: 'PACKS/CHANGE_CURRENT_PAGE', page} as const)
type ChangeCurrentPageACType = ReturnType<typeof changeCurrentPageAC>

export const setMinAC = (min: number) =>
    ({type: 'PACKS/SET_MIN', min} as const)
type SetMinACType = ReturnType<typeof setMinAC>

export const setMaxAC = (max: number) =>
    ({type: 'PACKS/SET_MAX', max} as const)
type SetMaxACType = ReturnType<typeof setMaxAC>

export const setPageCountAC = (pageCount: number) =>
    ({type: 'PACKS/SET_PAGE_COUNT', pageCount} as const)
type SetPageCountACType = ReturnType<typeof setPageCountAC>

export const setFilteredPacksAC = (packName: string) =>
    ({type: 'PACKS/SET_FILTERED_PACKS', packName} as const)
type setFilteredPacksACType = ReturnType<typeof setFilteredPacksAC>

export const setDebouncingFlagAC = () =>
    ({type: 'PACKS/SET_DEBOUNCING_FLAG'} as const)
type SetDebouncingFlagACType = ReturnType<typeof setDebouncingFlagAC>

// Thunk creators
export const fetchPacksListsTC = () => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingAC(true))

        let {packName, min, max, sortPacks, page, pageCount, myPacks, user_id} = getState().cardsPack;
        let myUserId = getState().profilePage._id;

        user_id = myPacks ? myUserId : user_id

        const payload = {packName, min, max, sortPacks, page, pageCount, user_id};

        cardsPackApi.getPacks(payload)
            .then((res) => {
                dispatch(setPacksListsAC(res.data))
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
            })
            .finally(() => {
                dispatch(setLoadingAC(false));
            })
    }
}

export const deletePackTC = (packId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setLoadingAC(true))

        cardsPackApi.deletePack(packId)
            .then(() => {
                dispatch(fetchPacksListsTC())
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
                dispatch(setLoadingAC(false));
            })
    }
}

export const addPackTC = (packName: string, privateValue: boolean): AppThunkType => {
    return (dispatch) => {
        dispatch(setLoadingAC(true))
        dispatch(sortPacksAC("0updated"))

        const payload = {
            name: packName,
            deckCover: '',
            private: privateValue
        }

        cardsPackApi.addPack(payload)
            .then(() => {
                dispatch(fetchPacksListsTC())
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
                dispatch(setLoadingAC(false))
            })
    }
}

export const editPackTC = (_id: string, packName: string): AppThunkType => {
    return (dispatch) => {
        dispatch(setLoadingAC(true))

        const payload = {
            _id: _id,
            name: packName,
        }

        cardsPackApi.updatePack(payload)
            .then(() => {
                dispatch(fetchPacksListsTC())
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
            })
    }
}
