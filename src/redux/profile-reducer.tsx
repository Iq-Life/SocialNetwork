import {ActionTypes, ThunksType} from "./redux-store";
import {profileAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS'


let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", like: 56},
        {id: 2, message: "It's my first post", like: 434},
        {id: 3, message: "Blabla", like: 44},
        {id: 4, message: "I lick banana", like: 4554}
    ],
    profile: null,
    status: ""
}

export const profileReducer = (state = initialState, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id: new Date().getTime(),
                message: action.newPostText,
                like: 0
            }
            return {...state, posts: [newPost, ...state.posts]}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} as UserProfile}
        case SAVE_PROFILE_SUCCESS:
            return {...state, profile: action.profile}
        default:
            return state
    }
}
//action
export const addPost = (newPostText: string) => {
    return {
        type: "ADD_POST",
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
export const deletePost = (id: number) => {
    return {type: 'DELETE_POST', id} as const
}
export const savePhotoSuccess = (photos: PhotosType) => {
    return {type: 'SAVE_PHOTO_SUCCESS', photos} as const
}
export const saveProfileSuccess = (profile: UserProfile) => {
    return {type: 'SAVE_PROFILE_SUCCESS', profile} as const
}
//thunk
export const getUserProfile = (userId: number): ThunksType =>
    async (dispatch) => {
        let response = await userAPI.getProfile(userId)
        dispatch(setUserProfile(response))
    }
export const getUserStatus = (userId: number): ThunksType =>
    async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatusProfile(response.data))
    }
export const updateStatusProfile = (status: string): ThunksType =>
    async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusProfile(status))
        }
    }
export const savePhoto = (photos: File): ThunksType =>
    async (dispatch) => {
        let response = await profileAPI.savePhoto(photos)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
export const saveProfile = (profile: UserProfile): ThunksType =>
    async (dispatch) => {
        let response = await profileAPI.saveProfile(profile)
        debugger
        if (response.data.resultCode === 0) {
            dispatch(saveProfileSuccess(profile))
        } else {
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }
    }
//type
export type ProfilePageType = {
    posts: Array<PostsType>
    profile: UserProfile | null
    status: string
}
export type PostsType = {
    id: number
    message: string
    like: number
}
export type UserProfile = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: null
    fullName: string
    aboutMe: string
    contacts: ContactsUserProfile
    photos: PhotosType
}
export type ContactsUserProfile = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type PhotosType = {
    small: string
    large: string
}
