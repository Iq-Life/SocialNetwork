export type RooTStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPgeType
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
export type StoreType = {
    _state: RooTStateType
    getState: () => RooTStateType
    subscribe: (observer: any) => void
    _callSubscriber: (state: RooTStateType) => void
    dispatch: (action: ActionTypes) => void
}
export type ActionTypes = ReturnType<typeof addPostAC>|ReturnType<typeof changeNewTextAC>|ReturnType<typeof addMessageAC>| ReturnType<typeof changeNewMessageTextAC>

export const addPostAC = (postText: string) => {
    return {
        type: "ADD-POST",
        postText: postText
    } as const
}
export const addMessageAC = (messageText: string) => {
    return {
        type: "ADD-MESSAGE",
        messageText: messageText
    } as const
}
export const changeNewTextAC = (newText: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    } as const
}
export const changeNewMessageTextAC = (newMessageText: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newMessageText: newMessageText
    } as const
}

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
        }
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
        if (action.type === "ADD-POST") {
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: action.postText,
                like: 0}
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = ''
            this._callSubscriber(store.getState())

        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(store.getState())

        } else if (action.type === "ADD-MESSAGE") {
            let newMessage: MessagesType = {
                id: new Date().getTime(),
                message: action.messageText}
            this._state.dialogsPage.messages.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber(store.getState())

        } else if (action.type === "UPDATE-NEW-MESSAGE-TEXT") {
            debugger
            this._state.dialogsPage.newMessageText = action.newMessageText
            this._callSubscriber(store.getState())
        }
    }
}


/*
    addPost(postText) {
        let newPost: PostsType = {
            id: new Date().getTime(),
            message: postText,
            like: 0
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = ''
        this._callSubscriber(store.getState())
    },
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber(store.getState())
    },
*/
