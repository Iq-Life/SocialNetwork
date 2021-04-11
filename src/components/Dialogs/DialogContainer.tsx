import React from 'react';
import {addMessage, changeNewTextDialogs, DialogsPgeType} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialog";
import {AppStateType} from "../../redux/redux-store";


type MapStateToProps = {
    dialogsPage: DialogsPgeType
    newMessageText: string
    isAuth:boolean
}
type MapDispatchToProps = {
    changeNewTextDialogs: (newMessageText: string) => void
    addMessage: any
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isFetching
    }
}

const DialogsContainer = connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>
(mapStateToProps, {changeNewTextDialogs, addMessage})(Dialogs);

export default DialogsContainer;