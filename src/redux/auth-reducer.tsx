import {ActionTypes, ThunksType} from "./redux-store";
import {authAPI, ResultCodeEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS"

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    captchaUrl: null // if null, then captcha is not required
}
export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data}
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state
    }
}
//action
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isFetching: boolean) => {
    return {type: SET_USER_DATA, data: {id, email, login, isFetching}} as const
}
export const getCaptchaUrlSuccess = (captcha: string | null) => {
    return {type: GET_CAPTCHA_URL_SUCCESS, payload: {captcha}} as const
}
//thunk
export const getAutUserData = (): ThunksType => async (dispatch) => {
    const response = await authAPI.me()

    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean): ThunksType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAutUserData())
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message: string = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = (): ThunksType => async (dispatch) => {
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export const getCaptchaUrl = (): ThunksType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
//type
export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    captchaUrl: string | null
}
