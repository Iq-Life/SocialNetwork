import {ActionTypes, ThunksType} from "./redux-store";
import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA"

export type InitialStateType = {
    id: number|null
    email: string|null
    login: string|null
    isFetching: boolean
}

let initialState : InitialStateType= {
    id: null,
    email: null,
    login: null,
    isFetching: false
}

const authReducer = (state = initialState, action : ActionTypes) : InitialStateType=> {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export const setAuthUserData = (id:number|null, email: string|null, login: string|null, isFetching: boolean ) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login, isFetching}
    } as const
}

export const getAutUserData = (): ThunksType => (dispatch) => {
    authAPI.me().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    })
}
export const login = (email: string, password: string, rememberMe: boolean): ThunksType => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(response => {
        if (response.resultCode === 0) {
            dispatch(getAutUserData())
        }
    })
}

export const logout = (): ThunksType => (dispatch) => {
    authAPI.logout().then(response => {

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    })
}

export default authReducer
