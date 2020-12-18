import React from 'react';
import s from './Dialog.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionTypes, DialogsPgeType} from "../../redux/state";
import {changeNewMessageTextAC} from "../../redux/profile-reducer";
import {addMessageAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialog";

type DialogsTypeContainer = {
    dispatch: (action: ActionTypes) => void
    newMessageText:string
    dialogsPage: DialogsPgeType
}

function DialogsContainer(props: DialogsTypeContainer) {

    let addMessage = () => {
        props.dispatch(addMessageAC(props.newMessageText))
    }

    let onMessageChange = (newMessageText:string) => {
            props.dispatch(changeNewMessageTextAC(newMessageText))
    }

    return <Dialogs dialogsPage={props.dialogsPage}
                    newMessageText={props.newMessageText}
                    addMessage={addMessage}
                    updateNewMessageText={onMessageChange}
    />
}

export default DialogsContainer;