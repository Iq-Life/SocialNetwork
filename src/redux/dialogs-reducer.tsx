import {ActionTypes, DialogsPgeType, MessagesType, RooTStateType} from "./state";

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'
const ADD_MESSAGE = 'ADD_MESSAGE'

export const dialogsReducer = (state: DialogsPgeType, action: ActionTypes) => {
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