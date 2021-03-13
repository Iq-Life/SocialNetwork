import {combineReducers, createStore} from "redux";
import profileReducer, {addPostAC, changeNewMessagePostTextAC} from "./profile-reducer";
import dialogsReducer, {addMessageAC, changeNewTextDialogsAC} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {followed, setCurrentPage, toggleIsFetching,
    setTotalUsersCount, setUsers, unfollowed} from "./users-reducer";

export type ActionTypes = ReturnType<typeof addPostAC>|ReturnType<typeof changeNewMessagePostTextAC> |
    ReturnType<typeof addMessageAC>| ReturnType<typeof changeNewTextDialogsAC>|
    ReturnType<typeof followed>| ReturnType<typeof unfollowed>| ReturnType<typeof setUsers>|
    ReturnType<typeof setCurrentPage>| ReturnType<typeof setTotalUsersCount>|
    ReturnType<typeof toggleIsFetching>

export let reducersBatch= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer
});

let store = createStore(reducersBatch);

export type AppStateType = ReturnType<typeof reducersBatch>

export default store