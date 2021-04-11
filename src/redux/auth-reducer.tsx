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
                ...action.data,
                isFetching: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (id:number|null, email: string|null, login: string|null ) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login}
    } as const
}

export const getAutUserData = (): ThunksType => (dispatch) => {
    authAPI.me().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login))
        }
    })
}

export default authReducer
