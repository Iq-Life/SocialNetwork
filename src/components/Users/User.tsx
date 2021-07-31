import React from "react";
import avatar from './../../assets/img/ava.png';
import style from './User.module.css'
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

export let User = (props: UserPropsType) => {
    let user = props.user
    return (
        <div className={style.user}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img className={style.ava}
                         src={user.photos.small != null ? user.photos.small : avatar}
                         alt="ava"/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  props.unfollow(user.id)
                              }}>
                        Unfollow</button>
                    : <button disabled={props.followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  props.follow(user.id)
                              }}>
                        Follow</button>}
            </div>
            <div>{user.name}</div>
            <div>{user.status}</div>
            <div>{"user.location.country"}</div>
            <div>{"user.location.city"}</div>
        </div>
    )
}

//type
export type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}
