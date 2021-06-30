import React from "react";
import Header from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

type MapStateToProps = {
    login: string|null
    isFetching: boolean
}
type MapDispatchToProps = {
    logout: () => void
}
type HeaderContainerType = MapStateToProps & MapDispatchToProps

class HeaderContainer extends React.Component <HeaderContainerType> {



    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        isFetching: state.auth.isFetching,
        login: state.auth.login
    }
}


export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>
(mapStateToProps, {logout})(HeaderContainer)