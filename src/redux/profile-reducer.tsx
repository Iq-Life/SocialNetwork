import {ActionTypes, PostsType, ProfilePageType, RooTStateType} from "./state";

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'

 const profileReducer = (state: ProfilePageType, action: ActionTypes) => {
    switch (action.type){
        case ADD_POST:
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: action.postText,
                like: 0
            }
            state.posts.push(newPost);
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
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
export const changeNewMessageTextAC = (newMessageText: string) => {
    return {
        type: "UPDATE_NEW_MESSAGE_TEXT",
        newMessageText: newMessageText
    } as const
}

export default profileReducer;