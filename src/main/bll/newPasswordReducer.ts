import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {loginApi} from "../../API/loginAPI";
import {setErrorAC, setLoadingAC} from "./loginReducer";

export type InitialStateType = {
    error: null | string
    isChangedPass: boolean
}

const initialState = {
    error: null,
    isChangedPass: false,
}

export const newPasswordReducer = (state: InitialStateType = initialState, action: newPasswordActionsType): InitialStateType => {
    switch (action.type) {
        case 'NEW_PASSWORD/SET_IS_CHANGED_PASSWORD':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
};

// actions
const setIsChangedPassAC = (isChangedPass: boolean) => {
    return {
        type: 'NEW_PASSWORD/SET_IS_CHANGED_PASSWORD',
        payload: {
            isChangedPass: isChangedPass
        } as const
    }
};

// types
export type newPasswordActionsType = setIsChangedPassType
type setIsChangedPassType = ReturnType<typeof setIsChangedPassAC>

// thunks
export const changePassTC = (newPassword: string, token: string | undefined): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true));
        loginApi.newPassword(newPassword, token)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setIsChangedPassAC(true))
                }
            })
            .catch(e => {
                dispatch(setErrorAC(e.response ? e.response.data.error : e.message))
            })
            .finally(() => {
                dispatch(setLoadingAC(false));
            })
    }
};
