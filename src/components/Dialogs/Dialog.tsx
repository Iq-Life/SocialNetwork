import React from 'react';
import s from './Dialog.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPgeType} from "../../redux/state";


type DialogsType = {
    dialogsPage: DialogsPgeType
    newMessageText: string
    addMessage:()=>void
    updateNewMessageText : (newMessageText:string)=> void
}

function Dialogs(props: DialogsType) {

    let dialogElements = props.dialogsPage.dialogs
        .map((d) => <DialogItem name={d.name} id={d.id}/>);
    let messageElements = props.dialogsPage.messages
        .map((m) => <Message id={m.id} message={m.message}/>)

    let newMessageElement = React.createRef<HTMLTextAreaElement>()

    let onAddMessage = () => {
        props.addMessage()
    }

    let onMessageChange = () => {
        if (newMessageElement.current) {
            let newMessageText = newMessageElement.current.value
            props.updateNewMessageText(newMessageText)
            newMessageElement.current.value = ""
        }
    }

    const addMessageKeyPress = (e:any) => {
        if (e.key === "Enter") {
            onAddMessage()
        }
    }

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
                        value={props.newMessageText}
                        placeholder={'Enter Your message'}
                        onKeyPress={addMessageKeyPress}
                    />
                    <button onClick={onAddMessage}>add</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;