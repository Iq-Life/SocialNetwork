import React from "react";
import s from './Header.module.css';
import {NavLink, Redirect} from "react-router-dom";

type HeaderType = {
    login: string | null
    isFetching: boolean
    logout: () => void
}

function Header(props: HeaderType) {
    return <div className={s.backImg}>
        <header className={s.header}>
            <div className={s.loginBock}>
                {props.isFetching
                    ? <div className={s.loginBockAuthorized}>
                        {props.login}
                        <button onClick={props.logout}>Logout</button>
                    </div>
                    : <NavLink to={"/login"}>LogIN</NavLink>}
            </div>
        </header>
    </div>
}

export default Header;