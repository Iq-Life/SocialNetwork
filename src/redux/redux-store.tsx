import { applyMiddleware, combineReducers, createStore } from "redux";
import {
	profileReducer,
	addPost,
	deletePost,
	setStatusProfile,
	setUserProfile,
	savePhotoSuccess, saveProfileSuccess
} from "./profile-reducer";
import { dialogsReducer, addMessage } from "./dialogs-reducer";
import { sidebarReducer } from "./sidebar-reducer";
import {
	usersReducer, followSuccess, setCurrentPage, toggleIsFetching,
	setTotalUsersCount, setUsers, unfollowSuccess, toggleFollowingInProgress
} from "./users-reducer";
import { authReducer, getCaptchaUrlSuccess, setAuthUserData } from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form"
import { appReducer, errorMessage, initializedSuccess } from "./app-reducer";
//types
export type ActionTypes = ReturnType<typeof addPost> | ReturnType<typeof setStatusProfile> |
	ReturnType<typeof addMessage> | ReturnType<typeof setUsers> |
	ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess> |
	ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalUsersCount> |
	ReturnType<typeof toggleIsFetching> | ReturnType<typeof setUserProfile> |
	ReturnType<typeof setAuthUserData> | ReturnType<typeof toggleFollowingInProgress> |
	ReturnType<typeof initializedSuccess> | ReturnType<typeof deletePost> |
	ReturnType<typeof savePhotoSuccess> | ReturnType<typeof saveProfileSuccess> |
	ReturnType<typeof getCaptchaUrlSuccess> | ReturnType<typeof errorMessage>

export type ThunksType = ThunkAction<void, AppStateType, unknown, ActionTypes>;
export type AppStateType = ReturnType<typeof reducersBatch>
//rootReducer
export let reducersBatch = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	sidebar: sidebarReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
});

let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.stroe = store

export default store