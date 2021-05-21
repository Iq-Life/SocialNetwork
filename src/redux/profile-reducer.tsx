import {ActionTypes, ThunksType} from "./redux-store";
import {profileAPI, userAPI} from "../api/api";

const ADD_POST = 'ADD_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
    profile: UserProfile| null
    status: string
}
export type PostsType = {
    id: number
    message: string
    like: number
}
export type ContactsUserProfile = {
    facebook: null,
    website: null,
    vk: null,
    twitter: null,
    instagram: null,
    youtube: null,
    github: null,
    mainLink: null
}
export type UserProfile ={
    aboutMe: string
    contacts: ContactsUserProfile
    lookingForAJob: boolean
    lookingForAJobDescription: null
    fullName: string
    userId: number
    photos: { small: string, large: string }
}

let initialState : ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", like: 56},
        {id: 2, message: "It's my first post", like: 434},
        {id: 3, message: "Blabla", like: 44},
        {id: 4, message: "I lick banana", like: 4554}
    ],
    newPostText: '',
    profile: null,
    status: ""
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
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}


export const addPost = (postText: string) => {
    return {
        type: "ADD_POST",
        postText: postText
    } as const
}
export const updateNewPostText = (newPostText: string) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT',
        newPostText: newPostText
    } as const
}
export const setUserProfile = (profile: null | UserProfile) => {
    return {
        type: 'SET_USER_PROFILE',
        profile: profile
    } as const
}
export const setStatusProfile = (status: string) => {
    return {
        type: 'SET_STATUS',
        status: status
    } as const
}

export const getUserProfile =  (userId: number):ThunksType =>
    (dispatch) => {
        userAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response))
        })
}

export const getUserStatus =  (userId: number):ThunksType =>
    (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
            dispatch(setStatusProfile(response.data))
        })
}

export const updateStatusProfile =  (status: string):ThunksType =>
    (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if ( response.data.resultCode === 0) {
                dispatch(setStatusProfile(status))
            }
        })
}

export default profileReducer;