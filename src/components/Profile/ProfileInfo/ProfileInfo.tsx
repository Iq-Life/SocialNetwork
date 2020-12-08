import React from "react";
import s from './ProfileInfo.module.css';
import lo from './../../../assets/img/samurai.jpg';


export function ProfileInfo() {
    return (
    <div>
        <div><img className={s.head} src={lo} alt="I"/></div>
        <div className={s.description}>ava + description</div>
    </div>
    )}