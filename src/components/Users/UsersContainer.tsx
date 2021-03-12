import React from "react";
import {connect} from "react-redux";
import store, {AppStateType} from "../../redux/redux-store";
import {
    followedAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowedAC,
    UserType
} from "../../redux/users-reducer";
import axios from "axios";
import {Users} from "./Users";

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

export type UsersAPIComponentPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

class UsersAPIComponent extends React.Component <UsersAPIComponentPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChange = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      users={this.props.users}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChange={this.onPageChange}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
        />
    }
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
(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)
export default UsersContainer