import {ActionTypes, DialogsPgeType, MessagesType} from "./state";

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'
const ADD_MESSAGE = 'ADD_MESSAGE'

let initialState = {
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

export const dialogsReducer = (state= initialState, action: ActionTypes) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage: MessagesType = {
                id: new Date().getTime(),
                message: action.messageText}
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText
            return state
        default:
            return state
    }
}

export const addMessageAC = (messageText: string) => {
    return {
        type: "ADD_MESSAGE",
        messageText: messageText
    } as const
}
export const changeNewTextAC = (newText: string) => {
    return {
        type: "UPDATE_NEW_POST_TEXT",
        newText: newText
    } as const
}

export default dialogsReducer;