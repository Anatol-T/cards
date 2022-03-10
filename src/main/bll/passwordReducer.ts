import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {authAPI} from "../../API/api";
import {setErrorAC} from "./loginReducer";

type  InitialStateType = {
    password: string
    resetPasswordToken: string
    isSend: boolean
    email: string
    error: string
}

const initialState = {
    password: '',
    resetPasswordToken: '',

    isSend: false,
    email: '',
    error: ''
}

export const passwordReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_NEW_PASSWORD":
            return {
                ...state,
                password: action.payload.newPassword,
                resetPasswordToken: action.payload.resetPasswordToken,
            }
        case "SEND_EMAIL":
            return {
                ...state,
                isSend: action.payload.isSend,
                email: action.payload.email
            }
        case "SET_PASSWORD_ERROR":
            return {
                ...state,
                error: action.payload.error,
            }


        default:
            return state
    }
};

// type


export type AuthActionsType = passwordRecoveryACType | passwordForgotACType | setErrorPasswordACType

// actions

export const passwordForgotAC = (isSend: boolean, email: string) =>
    ({
        type: 'SEND_EMAIL',
        payload: {
            isSend,
            email
        }
    } as const)


export const passwordRecoveryAC = (newPassword: any, resetPasswordToken: any) =>
    ({
        type: 'SET_NEW_PASSWORD',
        payload: {
            newPassword,
            resetPasswordToken
        }
    } as const)
export const setErrorPasswordAC = (error: string) => {
    return {
        type: 'SET_PASSWORD_ERROR',
        payload: {
            error: error
        },
    } as const
};


type passwordRecoveryACType = ReturnType<typeof passwordRecoveryAC>
type passwordForgotACType = ReturnType<typeof passwordForgotAC>
type setErrorPasswordACType = ReturnType<typeof setErrorPasswordAC>


// thunk
export const passwordRecoveryTC = (password: string, resetPasswordToken: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        authAPI.recoveryPassword(password, resetPasswordToken)
            .then(res => {
                if (res.status === 200) {
                    const newPassword = res.data.newPassword
                    const newToken = res.data.token
                    const action = passwordRecoveryAC(newPassword, newToken)
                    dispatch(action)
                }
            })
    }
};

export const passwordForgotTC = (email: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        authAPI.sendMail(email)
            .then(res => {
                if (res.status === 200) {
                    dispatch(passwordForgotAC(true, email))
                }
            })
            .catch(e => {
                dispatch(setErrorPasswordAC(e.response ? e.response.data.error : e.message))
            })
    }
};
