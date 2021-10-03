import React, {FC} from "react";
import style from './Users.module.css'
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/paginator/Paginator";
import {User} from "./User";

export let Users: FC<UsersPropsType> = ({
                                            users, follow, unfollow, totalUsersCount,
                                            pageSize, currentPage, onPageChange, followingInProgress,
                                        }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={style.all}>
        <div className={style.paginator}>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChange={onPageChange}
                       portionSize={15}/>
        </div>
        <div className={style.users}>
            {users.map(u => <User
                key={u.id}
                user={u}
                followingInProgress={followingInProgress}
                follow={follow}
                unfollow={unfollow}
            />)}
        </div>
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
