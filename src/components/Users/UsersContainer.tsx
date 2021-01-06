import React from "react";
import {AppStateType} from "../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {UserType} from "../../redux/state";
import Users from "./Users";


function UsersContainer() {

    let users = useSelector<AppStateType, Array<UserType>>(state => state.usersPage.users)

    let dispatch = useDispatch()

    let mdtp = ()=> {
        return {
        }
    }

    return <Users users={users}/>
}
export default UsersContainer