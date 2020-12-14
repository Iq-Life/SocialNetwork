import React from "react";
import s from './Header.module.css';
import lo from './../../assets/img/13.jpg';

function Header() {
    return <header className={s.header}>
        <img src={lo} alt="World atlas" />
    </header>
    }

export default Header;