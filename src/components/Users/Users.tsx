import React from "react";
import avatar from './../../assets/img/ava.png';
import style from './Users.module.css'
import {UserType} from "../../redux/users-reducer";

export type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (p: number) => void
}

export let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div className={style.all}>
        <div className={style.spanPage}>
            {pages.map(p => {
                return <span className={props.currentPage === p ? style.selectedPage : style.usersPage}
                             onClick={(e) => {
                                 props.onPageChange(p)
                             }}
                             style={{cursor: 'pointer'}}
                >{p}</span>

            })}
        </div>
        <div>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={style.ava}
                             src={u.photos.small != null ? u.photos.small : avatar}
                             alt="ava"/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)}
        </div>
    </div>

}

/*
export function Users(props: UsersPropsType) {
    const getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                debugger
                props.setUsers(response.data.items)
            })
        }
    }
    return (
        <div className={style.all}>
            <div>
                <button onClick={getUsers}>Get users</button>
                {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={style.ava}
                             src={u.photos.small != null ? u.photos.small : avatar}
                             alt="ava"/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollowed(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.followed(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
                </div>)}
            </div>
        </div>
    )
}*/
