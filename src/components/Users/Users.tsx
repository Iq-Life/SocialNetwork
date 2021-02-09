import React from "react";
import avatar from './../../assets/img/ava.png';
import style from './Users.module.css'
import {UserType} from "../../redux/users-reducer";
import axios from "axios";

export type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

export class Users extends React.Component <UsersPropsType> {
    constructor(props: UsersPropsType) {
        super(props)

        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        })
    }

render() {
    return <div className={style.all}>
        <div>
            {this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={style.ava}
                             src={u.photos.small != null ? u.photos.small : avatar}
                             alt="ava"/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)
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
    )
}*/
