import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {addPost, setUserProfile, updateNewPostText} from "./profile-reducer";
import dialogsReducer, {addMessage, changeNewTextDialogs} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {
    followed, setCurrentPage, toggleIsFetching,
    setTotalUsersCount, setUsers, unfollowed, toggleFollowingInProgress
} from "./users-reducer";
import authReducer, {setAuthUserData} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

export type ActionTypes = ReturnType<typeof addPost>|ReturnType<typeof updateNewPostText> |
    ReturnType<typeof addMessage>| ReturnType<typeof changeNewTextDialogs>|
    ReturnType<typeof followed>| ReturnType<typeof unfollowed>| ReturnType<typeof setUsers>|
    ReturnType<typeof setCurrentPage>| ReturnType<typeof setTotalUsersCount>|
    ReturnType<typeof toggleIsFetching>| ReturnType<typeof setUserProfile>|
    ReturnType<typeof setAuthUserData> | ReturnType<typeof toggleFollowingInProgress>

export let reducersBatch= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,

});

let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof reducersBatch>

export default store