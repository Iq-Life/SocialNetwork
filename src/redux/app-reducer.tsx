import { ActionTypes, ThunksType } from "./redux-store";
import { getAutUserData } from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"

let initialState: InitialStateType = {
	initialized: false
}
export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
	switch (action.type) {
		case SET_INITIALIZED:
			return { ...state, initialized: true }
		case SET_ERROR_MESSAGE:
			return { ...state, errorMessage: "" }
		default:
			return state
	}
}

//action
export const initializedSuccess = () => {
	return {
		type: "SET_INITIALIZED"
	} as const
}
export const errorMessage = (errorMessage: string) => {
	return {
		type: "SET_ERROR_MESSAGE",
		errorMessage
	} as const
}
//thunk
export const initializeApp = (): ThunksType => async (dispatch) => {
	const promise = dispatch(getAutUserData())


	Promise.all([promise])
		.then(() => {
			dispatch(initializedSuccess())
		})
	//await dispatch(getAutUserData())
	//dispatch(initializedSuccess())
}
//type
export type InitialStateType = {
	initialized: boolean
	errorMessage?: string
}


