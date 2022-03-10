import {Dispatch} from "redux";
import {AppThunkType} from "./store";
import {registrationAPI} from "../../API/api-registration";

const initialState = {
  isRegistered: false,
  errorRegister: '',
}

export const registerReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case "REGISTER/SET-REGISTER":
      return {...state, isRegistered: action.isRegistered}
    case 'REGISTER/SET-ERROR':
      return {...state, errorRegister: action.errorRegister}
    default:
      return state
  }
};

// type
type InitialStateType = {
  isRegistered: boolean
  errorRegister: string
}

export type AuthActionsType = setRegisterType | setErrorType

// actions
export const setRegister = (isRegistered: boolean) =>
  ({type: 'REGISTER/SET-REGISTER', isRegistered} as const)

type setRegisterType = ReturnType<typeof setRegister>

export const setRegisterError = (errorRegister: string) =>
  ({type: 'REGISTER/SET-ERROR', errorRegister} as const)

type setErrorType = ReturnType<typeof setRegisterError>

// thunk
export const registerTC = (email: string, password: string): AppThunkType => {
  return (dispatch: Dispatch) => {
    registrationAPI.register(email, password)
      .then(() => {
        dispatch(setRegister(true))
      })
      .catch(e => {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setRegisterError(error))
      })
  }
};