import React from 'react';
import {addMessageAC, changeNewTextDialogsAC, DialogsPgeType} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialog";
import store, {AppStateType} from "../../redux/redux-store";


type IMapStateToProps ={
    dialogsPage: DialogsPgeType
    newMessageText: string
}
type IMapDispatchToProps ={
    updateNewMessageText: (newMessageText: string) => void
    addMessage: any
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText
    }
}
    let mapDispatchToProps = () => {
        return {
            updateNewMessageText: (newMessageText: string) => {
                store.dispatch(changeNewTextDialogsAC(newMessageText))
            },
            addMessage: (newMessageText: string) => {
                store.dispatch(addMessageAC(newMessageText))
            }
        }
    }
    const DialogsContainer = connect<IMapStateToProps, IMapDispatchToProps, {}, AppStateType>
    (mapStateToProps, mapDispatchToProps)(Dialogs);

    export default DialogsContainer;