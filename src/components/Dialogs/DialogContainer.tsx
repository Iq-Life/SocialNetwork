import React from 'react';
import {addMessage, changeNewTextDialogs, DialogsPgeType} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialog";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

type MapStateToProps = {
    dialogsPage: DialogsPgeType
    newMessageText: string
}
type MapDispatchToProps = {
    changeNewTextDialogs: (newMessageText: string) => void
    addMessage: (messageText: string)=>void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>
    (mapStateToProps, {changeNewTextDialogs, addMessage}),
    withAuthRedirect
)(Dialogs);