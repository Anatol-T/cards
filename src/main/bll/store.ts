import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {authReducer} from "./authReducer";
import {AuthActionsType, loginReducer} from "./loginReducer";
import {registerReducer} from "./registerReducer";
import {profileReducer} from "./profileReducer";
import {passwordReducer} from "./passwordReducer";
import {newPasswordActionsType, newPasswordReducer} from "./newPasswordReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    login: loginReducer,
    register: registerReducer,
    profilePage: profileReducer,
    recovery: passwordReducer,
    newPassword: newPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для App
export type AppActionsType = AuthActionsType | newPasswordActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;