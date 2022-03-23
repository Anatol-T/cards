import {Dispatch} from "redux";
import {AppActionsType} from "../../main/bll/store";

export const sortFields = (field: string, sortAC: (sortItems: string) => {},loading: boolean, value: string, dispatch: Dispatch<AppActionsType>) => {
    if (loading) return
    if (value.slice(1) !== field) {
        dispatch(<AppActionsType>sortAC('0' + field))
    } else {
        if (value[0] !== '0') {
            dispatch(<AppActionsType>sortAC('0' + field))
        } else {
            dispatch(<AppActionsType>sortAC('1' + field))
        }
    }
}