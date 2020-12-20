import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

export let reducersBatch= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
});

let store = createStore(reducersBatch);

export type AppStateType = ReturnType<typeof reducersBatch>


// const mstp = (state: AppStateType)=> {
//     return {
//         users: state.userrsReduicer.users
//     }
// }


export default store