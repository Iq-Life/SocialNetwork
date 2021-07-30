import React from "react";
import style from './Users.module.css'
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/paginator/Paginator";
import {User} from "./User";

export let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={style.all}>
        <div className={style.users}>
            {props.users.map(u => <User
                key={u.id}
                user={u}
                followingInProgress={props.followingInProgress}
                follow={props.follow}
                unfollow={props.unfollow}
            />)}
        </div>
        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                   currentPage={props.pageSize} onPageChange={props.onPageChange}
                   portionSize={15}/>
    </div>
}

//type
export type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (p: number) => void
    followingInProgress: Array<number>
}
