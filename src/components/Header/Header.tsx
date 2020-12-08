import React from "react";
import s from './Header.module.css';
import lo from './../../assets/img/14.jpg';

function Header() {
    return <header className={s.header}>
        <img src={lo} alt="World atlas" width={1100} height={50} />
    </header>
    }

export default Header;