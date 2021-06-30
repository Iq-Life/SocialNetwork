import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {addPost, setStatusProfile, setUserProfile} from "./profile-reducer";
import dialogsReducer, {addMessage} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {followSuccess, setCurrentPage, toggleIsFetching,
    setTotalUsersCount, setUsers, unfollowSuccess, toggleFollowingInProgress
} from "./users-reducer";
import authReducer, {setAuthUserData} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from "redux-form"
import {initializedSuccess} from "./app-reducer";

export type ActionTypes = ReturnType<typeof addPost>| ReturnType<typeof setStatusProfile>|
    ReturnType<typeof addMessage>| ReturnType<typeof setUsers>|
    ReturnType<typeof followSuccess>| ReturnType<typeof unfollowSuccess>|
    ReturnType<typeof setCurrentPage>| ReturnType<typeof setTotalUsersCount>|
    ReturnType<typeof toggleIsFetching>| ReturnType<typeof setUserProfile>|
    ReturnType<typeof setAuthUserData> | ReturnType<typeof toggleFollowingInProgress>|
    ReturnType<typeof initializedSuccess>

export type ThunksType = ThunkAction<void, AppStateType , unknown, ActionTypes>;

export let reducersBatch= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer
});

let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof reducersBatch>

// @ts-ignore
window.stroe = store

export default store