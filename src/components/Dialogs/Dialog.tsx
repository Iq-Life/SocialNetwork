import React, {FormEvent} from 'react';
import s from './Dialog.module.css';
import DialogItem from "./DialogItem/DialogItem";
import {DialogsPgeType} from "../../redux/dialogs-reducer";
import Message from "./Message/Message";
import {Redirect} from 'react-router-dom';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type DialogsType = {
    dialogsPage: DialogsPgeType
    isAuth: boolean
    addMessage: (values: string) => void
}

type AddMessageFormType = {
    addNewMessage: (newMessageBody: string) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function Dialogs(props: DialogsType) {

    let dialogElements = props.dialogsPage.dialogs
        .map((d) => <DialogItem name={d.name} id={d.id}/>);
    let messageElements = props.dialogsPage.messages
        .map((m) => <Message id={m.id} message={m.message}/>)

    let addNewMessage = (values: any) => {
        props.addMessage(values.newMessageBody)
    }

    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <div>
                    <AddMessageReduxForm onSubmit={addNewMessage}/>
                    {/*<textarea
                        className={s.textMessages}
                        onChange={onMessageChange}
                        ref={newMessageElement}
                        value={props.newMessageText}
                        placeholder={'Enter Your message'}
                        onKeyPress={addMessageKeyPress}
                    />
                    <button onClick={onAddMessage}>add</button>*/}
                </div>
            </div>
        </div>
    )
}

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={"Enter Your message"} name={"newMessageBody"} component={"textarea"}/>
        </div>
        <button>add</button>
    </form>
}

const AddMessageReduxForm = reduxForm<AddMessageFormType>({form: "message"})(AddMessageForm)

export default Dialogs;
