import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {profileInitialState, setProfileData} from "./profileReducer";
import {authAndProfileApi} from "../dal/authAndProfileApi";
import {setErrorAC, setLoadingAC} from "./appReducer";

export type StateLoginType = {
    status: boolean
}

export const initialStateLogin: StateLoginType = {
    status: false, // успешен ли запрос или нет // SET_IS_LOGGED_IN
};

export const loginReducer = (state: StateLoginType = initialStateLogin, action: AuthActionsType): StateLoginType => {
    switch (action.type) {
        case "login/SET_IS_LOGGED_IN":
            return {
                ...state,
                status: action.payload.status,
            }
        default: {
            return state
        }
    }
};

// types
export type AuthActionsType = setSuccessType
type setSuccessType = ReturnType<typeof setIsLoggedInAC>

export const setIsLoggedInAC = (status: boolean) => {
    return {
        type: 'login/SET_IS_LOGGED_IN',
        payload: {
            status: status,
        },
    } as const
};

// thunks
export const loginTC = (email: string, password: string, remember: boolean): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true));
        authAndProfileApi.login(email, password, remember)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setProfileData(res.data))
                    dispatch(setIsLoggedInAC(true))
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

export const logoutTC = (): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true));
        authAndProfileApi.logout()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setProfileData(profileInitialState))
                    dispatch(setIsLoggedInAC(false))
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