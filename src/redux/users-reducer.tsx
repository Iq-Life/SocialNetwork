import {ActionTypes} from "./state";

const FOLLOWED = "FOLLOWED"
const UNFOLLOWED = "UNFOLLOWED"
const SET_USERS = "SET_USERS"

let initialState = {
    users: [
        {id: 1, followed: true, fullName: "Kirill", status: "First blood", country: "56"},
        {id: 2, followed: false, fullName: "Dmitriy", status: "It's my first status", country: 434},
        {id: 3, followed: true, fullName: "Sasha", status: "Blabla", country: 44},
        {id: 4, followed: false, fullName: "Kristina", status: "I lick banana", country: 4554}
    ]
}

const usersReducer = (state=initialState, action: ActionTypes) => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                users: [...state.users.map(u => {
                    if( u.id === action.usersID ){
                        return {...u, followed: true}
                    }
                })]
            }
        case UNFOLLOWED:
            return {...state, users: [ ...state.users.map( u => {
                    if ( u.id === action.usersID) {
                        return {...u, followed: false}}
                })]
            }
            case
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
export const setUsersAC = (users: ) => {
    return {
        type: "UNFOLLOWED",
        users:
    } as const
}

export default usersReducer;