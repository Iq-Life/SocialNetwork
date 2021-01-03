import React from "react";
import './Users.css';
import {UserType} from "../../redux/state";

export type UsersPageType = {
    users: Array<UserType>
}
function Users(props:UsersPageType) {
    return (
        <div>{
            props.users.map( u => <div key={u.id}>
                <span>
                    <div>Avatar</div>
                    <button>Follow</button>
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
            </div>)
        }</div>
    )
}
export default Users