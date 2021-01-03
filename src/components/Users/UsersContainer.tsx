import React from "react";
import {AppStateType} from "../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {UsersPageType} from "../../redux/state";
import Users from "./Users";


function UsersContainer() {

    let usersPage = useSelector<AppStateType, UsersPageType>(state => state.usersPage)

    let dispatch = useDispatch()
    let mdtp = ()=> {
        return {
        }
    }

    return <Users users={usersPage}/>
}
export default UsersContainer