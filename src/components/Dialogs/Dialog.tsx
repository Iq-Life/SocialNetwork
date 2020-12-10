import React from 'react';
import s from './Dialog.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionTypes,  addMessageAC, updateNewMessageTextAC, DialogsPgeType} from "../../redux/state";

type DialogsType = {
    dialogsPage: DialogsPgeType
    dispatch: (action: ActionTypes) => void
    newMessageText: string
}

function Dialogs(props: DialogsType) {

    let dialogElements = props.dialogsPage.dialogs
        .map((d) => <DialogItem name={d.name} id={d.id}/>);
    let messageElements = props.dialogsPage.messages
        .map((m) => <Message id={m.id} message={m.message}/>)

    let newMessageText =props.newMessageText;

    let newMessageElement = React.createRef<HTMLTextAreaElement>()

    let addMessage = () => {
        props.dispatch(addMessageAC(props.newMessageText))
    }
    let onMessageChange = (e: any) => {
        let  body = e.event.value;
        props.dispatch(updateNewMessageTextAC(newMessageText))
    }
    /*let onMessageChange = () => {
        if (newMessageElement.current) {
            let newMessageText = newMessageElement.current.value
            props.dispatch(changeNewTextAC(newMessageText))
            newMessageElement.current.value = ""
        }
    }*/


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <div>
                    <textarea
                        className={s.textMessages}
                        onChange={onMessageChange}
                        ref={newMessageElement}
                        value={newMessageText}
                        placeholder={'Enter Your message'}
                    />
                    <button onClick={addMessage}>add</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;