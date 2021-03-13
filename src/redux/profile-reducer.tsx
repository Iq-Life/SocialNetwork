import {ActionTypes} from "./redux-store";

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type PostsType = {
    id: number
    message: string
    like: number
}

let initialState : ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", like: 56},
        {id: 2, message: "It's my first post", like: 434},
        {id: 3, message: "Blabla", like: 44},
        {id: 4, message: "I lick banana", like: 4554}
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionTypes):ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            let postText = state.newPostText
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: postText,
                like: 0
            }
            return {
                ...state,
                posts: [ newPost, ...state.posts],
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newPostText}
        default:
            return state
    }
}


export const addPostAC = (postText: string) => {
    return {
        type: "ADD_POST",
        postText: postText
    } as const
}
export const changeNewMessagePostTextAC = (newPostText: string) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT',
        newPostText: newPostText
    } as const
}

export default profileReducer;