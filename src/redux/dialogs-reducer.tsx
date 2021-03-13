import {ActionTypes} from "./redux-store";

export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsPgeType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}

const ADD_MESSAGE = 'ADD_MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

let initialState:DialogsPgeType = {
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

export const dialogsReducer = (state= initialState, action: ActionTypes):DialogsPgeType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let messageText = state.newMessageText
            let newMessage: MessagesType = {
                id: new Date().getTime(),
                message: messageText
            }
            return {...state, messages : [...state.messages, newMessage], newMessageText: ""}

        case UPDATE_NEW_MESSAGE_TEXT:
            return {... state, newMessageText: action.newMessageText}
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
export const changeNewTextDialogsAC = (newMessageText: string) => {
    return {
        type: 'UPDATE_NEW_MESSAGE_TEXT',
        newMessageText: newMessageText
    } as const
}

export default dialogsReducer;