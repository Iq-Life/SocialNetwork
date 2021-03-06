import React from "react";
import {Users} from "./Users";
import {connect} from "react-redux";
import store, {AppStateType} from "../../redux/redux-store";
import {followedAC, setCurrentPageAC, setTotalUsersCountAC} from "../../redux/users-reducer";
import {unfollowedAC} from "../../redux/users-reducer";
import {setUsersAC} from "../../redux/users-reducer";
import {UserType} from "../../redux/users-reducer";

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount:number
    currentPage: number
}

type MapDispatchToProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = () => {
    return {
        follow: (userId: number) => {
            store.dispatch(followedAC(userId))
        },
        unfollow: (userId: number) => {
            store.dispatch(unfollowedAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            store.dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            store.dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            store.dispatch( (setTotalUsersCountAC(totalCount)))
        }
    }
}

const UsersContainer = connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>
(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer