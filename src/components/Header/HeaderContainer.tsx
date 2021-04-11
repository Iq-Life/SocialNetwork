import React from "react";
import Header from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getAutUserData} from "../../redux/auth-reducer";


type MapStateToProps = {
    login: string|null
    isFetching: boolean
}
type MapDispatchToProps = {
    getAutUserData: () => void
}
type HeaderContainerType = MapStateToProps & MapDispatchToProps

class HeaderContainer extends React.Component <HeaderContainerType> {

    componentDidMount() {
        this.props.getAutUserData()
    }

    render() {
        return <Header {...this.props} login={this.props.login}/>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        isFetching: state.auth.isFetching,
        login: state.auth.login
    }
}


export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>
(mapStateToProps, {getAutUserData})(HeaderContainer)