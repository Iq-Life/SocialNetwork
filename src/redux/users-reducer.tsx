import {ActionTypes, UserType} from "./state";

const FOLLOWED = "FOLLOWED"
const UNFOLLOWED = "UNFOLLOWED"
const SET_USERS = "SET_USERS"

let initialState = {
    users: [
        {id: 1, followed: true, fullName: "Kirill", status: "First blood", location: {country: "Russia", city: "Penza"}},
        {id: 2, followed: false, fullName: "Dmitriy", status: "It's my first status", location: {country: "Belarus", city: "Minsk"}},
        {id: 3, followed: true, fullName: "Sasha", status: "Crazy girl", location: {country: "Ukraine", city: "Kiev"}},
        {id: 4, followed: false, fullName: "Kristina", status: "I lick banana", location: {country: "Russia", city: "Moscow"}}
    ]
}

const usersReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state, users: [...state.users.map(u => {
                    if (u.id === action.usersID) {
                        return {...u, followed: true}
                    }
                })]
            }
        case UNFOLLOWED:
            return {
                ...state, users: [...state.users.map(u => {
                    if (u.id === action.usersID) {
                        return {...u, followed: false}
                    }
                })]
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
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

export default usersReducer;