import profileReducer, {addPostAC, changeNewMessageTextAC} from "./profile-reducer";
import dialogsReducer, {addMessageAC, changeNewTextAC} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {followedAC, setUsersAC, unfollowedAC} from "./users-reducer";

export type RooTStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPgeType
    usersPage: UsersPageType
    sidebar: any
}
export type DialogsPgeType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type UsersPageType = {
    users: Array<UserType>
}
export type PostsType = {
    id: number
    message: string
    like: number
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type UserType = {
    id: number,
    followed: boolean,
    fullName: string,
    status: string,
    location: {country:string, city:string}
}
export type StoreType = {
    _state: RooTStateType
    getState: () => RooTStateType
    subscribe: (observer: any) => void
    _callSubscriber: (state: RooTStateType) => void
    dispatch: (action: ActionTypes) => void
}
export type ActionTypes = ReturnType<typeof addPostAC>|ReturnType<typeof changeNewTextAC>
    |ReturnType<typeof addMessageAC>| ReturnType<typeof changeNewMessageTextAC>|
    ReturnType<typeof followedAC>| ReturnType<typeof unfollowedAC>| ReturnType<typeof setUsersAC>

export let store: StoreType = {

    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", like: 56},
                {id: 2, message: "It's my first post", like: 434},
                {id: 3, message: "Blabla", like: 44},
                {id: 4, message: "I lick banana", like: 4554}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Diana"},
                {id: 2, name: "Kirill"},
                {id: 3, name: "Ilya"},
                {id: 4, name: "Anton"},
                {id: 5, name: "Maldor"}
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How is your it-kamasutra?"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Hi"},
                {id: 5, message: "Pi"}
            ],
            newMessageText: ''
        },
        usersPage: {
            users: [
            {id: 1, followed: true, fullName: "Kirill", status: "First blood", location: {country: "Russia", city: "Penza"}},
            {id: 2, followed: false, fullName: "Dmitriy", status: "It's my first status", location: {country: "Belarus", city: "Minsk"}},
            {id: 3, followed: true, fullName: "Sasha", status: "Crazy girl", location: {country: "Ukraine", city: "Kiev"}},
            {id: 4, followed: false, fullName: "Kristina", status: "I lick banana", location: {country: "Russia", city: "Moscow"}}
        ]},
        sidebar: {}
    },
    _callSubscriber() {
        console.log("state change")
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer
        this._callSubscriber(this._state)
    }
}