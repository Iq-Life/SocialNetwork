import React from "react";
import s from './Header.module.css';
import { NavLink } from "react-router-dom";

type HeaderType ={
    login: string|null
    isFetching: boolean
}

function Header(props:HeaderType) {
    return <div className={s.backImg}>
    <header className={s.header}>
        <div className={s.loginBock}>
            { props.isFetching ? <div className={s.loginBockAuthorized}>{props.login}</div>
                : <NavLink to={"/login"}>LogIN</NavLink> }
        </div>
    </header>
        </div>
    }

export default Header;