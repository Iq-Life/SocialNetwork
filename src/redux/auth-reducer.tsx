import {ActionTypes} from "./redux-store";

const SET_USER_DATA = "SET_USER_DATA"


export type InitialStateType = {
    id: null
    email: null
    login: null
}

let initialState : InitialStateType= {
    id: null,
    email: null,
    login: null
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

export const setUserData = ({id, email, login}: InitialStateType) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login}
    } as const
}

export default authReducer
