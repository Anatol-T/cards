import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {loginApi} from "../../API/loginAPI";
import { profileInitialState, setProfileData} from "./profileReducer";

export type StateLoginType = {
    status: boolean
    loading: boolean
    error: string
}

export const initialStateLogin: StateLoginType = {
    status: false, // успешен ли запрос или нет
    loading: false,
    error: '',
};

export const loginReducer = (state: StateLoginType = initialStateLogin, action: AuthActionsType): StateLoginType => {
    switch (action.type) {
        case "login/SET_ERROR":
            return {
                ...state,
                error: action.payload.error,
            }
        case "login/SET_LOADING":
            return {
                ...state,
                loading: action.payload.loading,
            }
        case "login/SET_STATUS":
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
export type AuthActionsType = setLoadingType | setSuccessType | setErrorType
type setLoadingType = ReturnType<typeof setLoadingAC>
type setSuccessType = ReturnType<typeof setSuccessAC>
type setErrorType = ReturnType<typeof setErrorAC>

// actions
export const setLoadingAC = (loading: boolean) => {
    return {
        type: 'login/SET_LOADING',
        payload: {
            loading: loading,
        },
    } as const
};

export const setSuccessAC = (status: boolean) => {
    return {
        type: 'login/SET_STATUS',
        payload: {
            status: status,
        },
    } as const
};

export const setErrorAC = (error: string) => {
    return {
        type: 'login/SET_ERROR',
        payload: {
            error: error,
        },
    } as const
};

// thunks
export const loginTC = (email: string, password: string, remember: boolean): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true));
        loginApi.login(email, password, remember)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setProfileData(res.data))
                    dispatch(setSuccessAC(true))
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
        loginApi.logout()
          .then((res) => {
              if (res.status === 200) {
                  dispatch(setProfileData(profileInitialState))
                  dispatch(setSuccessAC(false))
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