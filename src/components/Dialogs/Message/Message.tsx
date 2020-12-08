import React from 'react';
import s from './../Dialog.module.css';
import {MessagesType} from "../../../redux/state"

function Message(props:MessagesType) {

    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Message;