import {Dispatch} from "redux";
import axios from "axios";
import {authAndProfileApi, updateProfileRequestType, UserResponseType} from "../dal/authAndProfileApi";
import {setLoadingAC} from "./appReducer";

export const profileInitialState: UserResponseType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    token: '',
    created: null,
    updated: null,
}
export const profileReducer = (state = profileInitialState, action: ProfileActionsType): UserResponseType => {
    switch (action.type) {
        case "PROFILE/SET-PROFILE-DATA":
            return {...state, ...action.data}
        case "PROFILE/UPDATE-PROFILE-DATA":
            return {...state, name: action.data.name, avatar: action.data.avatar}
        case "PROFILE/SET-PROFILE-ERROR":
            return {...state, error: action.error}
        case "PROFILE/SET-PROFILE-DELETE-DATA":
            return profileInitialState;
        default:
            return state;
    }
}
//actions
export const setProfileData = (data: UserResponseType) => {
    return {type: 'PROFILE/SET-PROFILE-DATA', data} as const
}
export const updateProfileData = (data: UserResponseType) => {
    return {type: 'PROFILE/UPDATE-PROFILE-DATA', data} as const
}
export const setProfileError = (error: string) => {
    return {type: 'PROFILE/SET-PROFILE-ERROR', error} as const
}
export const setProfileDeleteData = () => {
    return {type: 'PROFILE/SET-PROFILE-DELETE-DATA'} as const
}

// thunks
export const updateProfile = (data: updateProfileRequestType) => (dispatch: Dispatch) => {
    dispatch(setLoadingAC(true));
    authAndProfileApi.updateProfile(data)
        .then(res => {
            dispatch(updateProfileData(res.data.updatedUser));
        })
        .catch(error => {
            if (axios.isAxiosError(error) && error.response) {
                dispatch(setProfileError(error.response.data.error));
            }
        })
        .finally(() => {
            dispatch(setLoadingAC(false));
        })
}

//types
export type ProfileActionsType =
    ReturnType<typeof setProfileData>
    | ReturnType<typeof updateProfileData>
    | ReturnType<typeof setProfileError>
    | ReturnType<typeof setProfileDeleteData>