import {ActionTypes} from "./state";

const FOLLOWED = "FOLLOWED"
const UNFOLLOWED = "UNFOLLOWED"
const SET_USERS = "SET_USERS"

export type UserType = {
    id: number,
    followed: boolean,
    name: string,
    status: string,
    location: {country:string, city:string},
    photos: any
}

type InitialStateType = {
    users: Array<UserType>
}

let initialState = {
    users: [

    ]
}

const usersReducer = (state: InitialStateType = initialState, action: ActionTypes):InitialStateType => {
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