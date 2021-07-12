import {ActionTypes, ThunksType} from "./redux-store";
import {getAutUserData} from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED"

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, initialized: true}
        default:
            return state
    }
}

export const initializedSuccess = () => {
    return {
        type: "SET_INITIALIZED"
    } as const
}

export const initializeApp = (): ThunksType => (dispatch) => {
       let promise = dispatch(getAutUserData())
        Promise.all([promise])
            .then(()=>{dispatch(initializedSuccess())})
    }



