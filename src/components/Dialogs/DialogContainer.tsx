import React from 'react';
import {DialogsPgeType} from "../../redux/state";
import {changeNewMessageTextAC} from "../../redux/profile-reducer";
import {addMessageAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialog";
import {connect, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type DialogsTypeContainer = {
    // dispatch: (action: ActionTypes) => void
    // newMessageText:string
    // dialogsPage: DialogsPgeType
}

function DialogsContainer() {

    let dialogsPage = useSelector<AppStateType, DialogsPgeType>(state => state.dialogsPage)

    let dispatch = useDispatch()

    let addMessage = () => {
        dispatch(addMessageAC(dialogsPage.newMessageText))
    }

    let onMessageChange = (newMessageText:string) => {
            dispatch(changeNewMessageTextAC(newMessageText))
    }

    return <Dialogs dialogsPage={dialogsPage}
                    newMessageText={dialogsPage.newMessageText}
                    addMessage={addMessage}
                    updateNewMessageText={onMessageChange}
    />
}

const SuperDialogsContainer = connect () (Dialogs);

export default DialogsContainer;