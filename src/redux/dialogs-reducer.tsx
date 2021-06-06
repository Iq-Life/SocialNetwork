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
}

const ADD_MESSAGE = 'ADD_MESSAGE'

let initialState: DialogsPgeType = {
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
    ]
}

export const dialogsReducer = (state = initialState, action: ActionTypes): DialogsPgeType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {...state, messages: [...state.messages, {id: 6, message: action.newMessageBody}]}
        default:
            return state
    }
}

export const addMessage = (newMessageBody: string) => {
    return {
        type: "ADD_MESSAGE",
        newMessageBody: newMessageBody
    } as const
}

export default dialogsReducer;