import {ActionTypes, ThunksType} from "./redux-store";
import {userAPI} from "../api/api";

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

let initialState : InitialStateType = {
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

export  const followSuccess = (usersID: number) => {
    return {
        type: "FOLLOWED",
        usersID: usersID
    } as const
}
 export const unfollowSuccess = (usersID: number) => {
    return {
        type: "UNFOLLOWED",
        usersID: usersID
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: "SET_USERS",
        users: users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: "SET_CURRENT_PAGE",
        currentPage: currentPage
    } as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: "SET_TOTAL_USERS_COUNT",
        count: totalCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: "TOGGLE_IS_FETCHING",
        isFetching: isFetching
    } as const
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => {
    return {
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching,
        userId
    } as const
}

export const getUsersThunkCreator = (currentPage:number, pageSize:number):ThunksType  => {
    return (dispatch) => {

    dispatch(toggleIsFetching(true))

    userAPI.getUsers(currentPage, pageSize).then(data => {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    })
}
}
export const follow = (userId:number):ThunksType  => {
    return (dispatch) => {

    dispatch(toggleFollowingInProgress(true, userId))

        userAPI.follow(userId).then(data => {
            if (data.resultCode == 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingInProgress(false, userId))
        })
}
}

export const unfollow = (userId:number):ThunksType  => {
    return (dispatch) => {

    dispatch(toggleFollowingInProgress(true, userId))

        userAPI.unfollow(userId).then(data => {
            if (data.resultCode == 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingInProgress(false, userId))
        })
}
}

export default usersReducer;