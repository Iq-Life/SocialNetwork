import {combineReducers, createStore} from "redux";
import profileReducer, {addPostAC, changeNewMessagePostTextAC} from "./profile-reducer";
import dialogsReducer, {addMessageAC, changeNewTextDialogsAC} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {followedAC, setCurrentPageAC, setIsFetchingAC,
    setTotalUsersCountAC, setUsersAC, unfollowedAC} from "./users-reducer";

export type ActionTypes = ReturnType<typeof addPostAC>|ReturnType<typeof changeNewMessagePostTextAC> |
    ReturnType<typeof addMessageAC>| ReturnType<typeof changeNewTextDialogsAC>|
    ReturnType<typeof followedAC>| ReturnType<typeof unfollowedAC>| ReturnType<typeof setUsersAC>|
    ReturnType<typeof setCurrentPageAC>| ReturnType<typeof setTotalUsersCountAC>|
    ReturnType<typeof setIsFetchingAC>

export let reducersBatch= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer
});

let store = createStore(reducersBatch);

export type AppStateType = ReturnType<typeof reducersBatch>

export default store