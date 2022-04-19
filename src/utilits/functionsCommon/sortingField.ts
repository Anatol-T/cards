import {Dispatch} from "redux";
import {AppActionsType} from "../../main/bll/store";

export const sortFields = (field: string, sortAC: (sortItems: string) => {},loading: boolean, value: string, dispatch: Dispatch<AppActionsType>) => {
    if (loading) return
    if (value.slice(1) !== field) {
        dispatch(sortAC('0' + field) as AppActionsType)
    } else {
        if (value[0] !== '0') {
            dispatch(sortAC('0' + field) as AppActionsType)
        } else {
            dispatch(sortAC('1' + field) as AppActionsType)
        }
    }
}