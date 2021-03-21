import React from "react";
import Header from "./Header";
import {AppStateType} from "../../redux/redux-store";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";

type HeaderContainerType = MapStateToProps & MapDispatchToProps

type MapStateToProps = {
    login: null
    isFetching: boolean
}
type MapDispatchToProps = {
    setAuthUserData: (id: null, email: null, login: null) => void
}

class HeaderContainer extends React.Component <HeaderContainerType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

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

// @ts-ignore
export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>
(mapStateToProps, {setAuthUserData})(HeaderContainer)