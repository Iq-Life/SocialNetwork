import React from 'react';
import {ActionTypes, DialogsPgeType, RooTStateType} from "../../redux/state";
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
/*

let mapStateToProps = (state:RooTStateType) => {
    return {
        dialogsPage:state.dialogsPage,
        newMessageText:state.dialogsPage.newMessageText
    }
}

let mapDispatchToProps = (dispatch: (action: ActionTypes) => void) => {
    return {
        updateNewMessageText: (newMessageText:string) => {
            dispatch(changeNewMessageTextAC(newMessageText))
        },
        addMessage: (text:DialogsPgeType) => {
            dispatch(addMessageAC(text.newMessageText))
        }
    }
}

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (Dialogs);
*/

export default DialogsContainer;