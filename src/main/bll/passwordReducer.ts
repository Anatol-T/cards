import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {authAndProfileApi} from "../dal/authAndProfileApi";
import {setErrorAC, setLoadingAC} from "./appReducer";

type  InitialStateType = {
    isSend: boolean
    email: string
    isChangedPass: boolean
}

const initialState = {
    isSend: false,
    email: '',
    isChangedPass: false
}

export const passwordReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "NEW_PASSWORD/SEND_EMAIL":
            return {
                ...state,
                isSend: action.payload.isSend,
                email: action.payload.email
            }
        case 'NEW_PASSWORD/SET_IS_CHANGED_PASSWORD':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
};

// type
// types
export type AuthActionsType = passwordForgotACType | setIsChangedPassType
type passwordForgotACType = ReturnType<typeof passwordForgotAC>
type setIsChangedPassType = ReturnType<typeof setIsChangedPassAC>

// actions

export const passwordForgotAC = (isSend: boolean, email: string) =>
    ({
        type: 'NEW_PASSWORD/SEND_EMAIL',
        payload: {
            isSend,
            email
        }
    } as const)

const setIsChangedPassAC = (isChangedPass: boolean) => {
    return {
        type: 'NEW_PASSWORD/SET_IS_CHANGED_PASSWORD',
        payload: {
            isChangedPass: isChangedPass
        }
    } as const
};


export const passwordForgotTC = (email: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true));
        authAndProfileApi.sendMail(email)
            .then(res => {
                if (res.status === 200) {
                    dispatch(passwordForgotAC(true, email))
                    dispatch(setErrorAC(''))
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

export const changePassTC = (newPassword: string, token: string | undefined): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true));
        authAndProfileApi.newPassword(newPassword, token)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setIsChangedPassAC(true))
                    dispatch(setErrorAC(''))
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
