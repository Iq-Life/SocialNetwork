import React from 'react';
import {addMessage, changeNewTextDialogs, DialogsPgeType} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialog";
import {AppStateType} from "../../redux/redux-store";


type IMapStateToProps ={
    dialogsPage: DialogsPgeType
    newMessageText: string
}
type IMapDispatchToProps ={
    changeNewTextDialogs: (newMessageText: string) => void
    addMessage: any
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText
    }
}

    const DialogsContainer = connect<IMapStateToProps, IMapDispatchToProps, {}, AppStateType>
    (mapStateToProps, {changeNewTextDialogs, addMessage})(Dialogs);

    export default DialogsContainer;