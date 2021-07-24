import {ActionTypes, ThunksType} from "./redux-store";
import {authAPI, ResultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA"

export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data}
        default:
            return state
    }
}
//action
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isFetching: boolean) => {
    return {type: SET_USER_DATA, data: {id, email, login, isFetching}} as const
}
//thunk
export const getAutUserData = (): ThunksType => async (dispatch) => {
    let response = await authAPI.me()

    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean): ThunksType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAutUserData())
    } else {
        let message: string = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = (): ThunksType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
//type
export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
}
let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false
}
