import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "../pages/p1-profile/Profile-reducer";
import {loginReducer} from "../pages/p2-login/Login -reducer";
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
  profile: profileReducer,
  login: loginReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;