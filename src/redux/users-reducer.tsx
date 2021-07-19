import {ActionTypes, ThunksType} from "./redux-store";
import {userAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {Dispatch} from "redux";

const FOLLOWED = "FOLLOWED"
const UNFOLLOWED = "UNFOLLOWED"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

export type UserType = {
    id: number,
    followed: boolean,
    name: string,
    status: string,
    location: { country: string, city: string },
    photos: { small: string, large: string }
}

type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                users: [...state.users.map(u => {
                    if (u.id === action.usersID) {
                        return {...u, followed: true}
                    } else {
                        return u
                    }
                })]
            }
        case UNFOLLOWED:
            return {
                ...state, users: [...state.users.map(u => {
                    if (u.id === action.usersID) {
                        return {...u, followed: false}
                    } else {
                        return u
                    }
                })]
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT :
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING :
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS : {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}

export const followSuccess = (usersID: number) => {
    return {type: "FOLLOWED", usersID} as const
}
export const unfollowSuccess = (usersID: number) => {
    return {type: "UNFOLLOWED", usersID} as const
}
export const setUsers = (users: Array<UserType>) => {
    return {type: "SET_USERS", users} as const
}
export const setCurrentPage = (currentPage: number) => {
    return {type: "SET_CURRENT_PAGE", currentPage} as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {type: "SET_TOTAL_USERS_COUNT", count: totalCount} as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {type: "TOGGLE_IS_FETCHING", isFetching} as const
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => {
    return {type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId} as const
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunksType =>
    async (dispatch) => {

        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))

        let data = await userAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number,
                                   apiMethod: (userId: number) => any,
                                   actionCreator: (userId: number) => ActionTypes) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let data = await userAPI.apiMethod(userId)
    if (data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}
export const follow = (userId: number): ThunksType =>
    async (dispatch) => {
        let apiMethod = userAPI.follow.bind(userId)
        let actionCreator = followSuccess
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
export const unfollow = (userId: number): ThunksType =>
    async (dispatch) => {
        let apiMethod = userAPI.unfollow.bind(userId)
        let actionCreator = unfollowSuccess


    }

export default usersReducer;