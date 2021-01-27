import React from "react";
import avatar from './../../assets/img/ava.png';
import style from './Users.module.css'
import {UserType} from "../../redux/users-reducer";

export type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

export function Users(props: UsersPropsType) {
    if ( props.users.length === 0){
        props.setUsers([
            {
                id: 1,
                followed: true,
                fullName: "Kirill",
                status: "I am a junior",
                location: {city: "Penza", country: "Russia"}
            },
            {
                id: 2,
                followed: true,
                fullName: "Diana",
                status: "Ketty say: Murr Meow",
                location: {city: "Belinsk", country: "Russia"}
            },
            {
                id: 3,
                followed: false,
                fullName: "Dmitry",
                status: "I am a boss",
                location: {city: "Minsk", country: "Belarus"}
            }
        ])
    }

    return (
        <div className={style.all}>
            <div>{props.users.map(u => <div key={u.id}>
                <span>
                    <div><img className={style.ava} src={avatar} alt="ava"/></div>
                    <div>{ u.followed
                        ? <button onClick={ () => {props.unfollow(u.id) } }>Unfollow</button>
                        : <button onClick={ () => {props.follow(u.id) } }>Follow</button>}
                        </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)}</div>
        </div>)


}