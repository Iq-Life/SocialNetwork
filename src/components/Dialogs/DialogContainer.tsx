import React from 'react';
import {addMessage, DialogsPgeType} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialog";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>
    (mapStateToProps, {addMessage}),
    withAuthRedirect
)(Dialogs);

// type
type MapStateToProps = {
    dialogsPage: DialogsPgeType
}
type MapDispatchToProps = {
    addMessage: (newMessageBody: string) => void
}