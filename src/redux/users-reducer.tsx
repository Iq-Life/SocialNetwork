import {ActionTypes} from "./state";

const FOLLOWED = "FOLLOWED"
const UNFOLLOWED = "UNFOLLOWED"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"

export type UserType = {
    id: number,
    followed: boolean,
    name: string,
    status: string,
    location: { country: string, city: string },
    photos: any
}

type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
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
        default:
            return state
    }
}

export const followedAC = (usersID: number) => {
    return {
        type: "FOLLOWED",
        usersID: usersID
    } as const
}
export const unfollowedAC = (usersID: number) => {
    return {
        type: "UNFOLLOWED",
        usersID: usersID
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: "SET_USERS",
        users: users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: "SET_CURRENT_PAGE",
        currentPage: currentPage
    } as const
}
export const setTotalUsersCountAC = (totalCount: number) => {
    return {
        type: "SET_TOTAL_USERS_COUNT",
        count: totalCount
    } as const
}

export default usersReducer;