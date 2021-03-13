import React from 'react';
import s from './../Dialog.module.css';
import {NavLink} from "react-router-dom";
import {DialogsType} from "../../../redux/dialogs-reducer";


function DialogItem(props: DialogsType) {

    let path = "/dialogs/" + props.id

    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;