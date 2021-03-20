import React from "react";
import s from './Header.module.css';
import { NavLink } from "react-router-dom";

function Header() {
    return <div className={s.backImg}>
    <header className={s.header}>
        <div className={s.loginBock}><NavLink to={"/login"}>LogIN</NavLink></div>
    </header>
        </div>
    }

export default Header;