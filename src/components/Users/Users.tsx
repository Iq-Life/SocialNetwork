import React from "react";
import avatar from './../../assets/img/ava.png';
import style from './Users.module.css'
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

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
        <div className={style.users}>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img className={style.ava}
                             src={u.photos.small != null ? u.photos.small : avatar}
                             alt="ava"/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "d9baecdc-1ca4-440c-8d10-aee3256853c8"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                    {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "d9baecdc-1ca4-440c-8d10-aee3256853c8"
                                        }
                                    })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
                                    })
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

    </div>
}
