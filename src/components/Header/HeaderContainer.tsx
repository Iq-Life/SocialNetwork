import React from "react";
import Header from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {headersAPI} from "../../api/api";


type MapStateToProps = {
    login: string|null
    isFetching: boolean
}
type MapDispatchToProps = {
    setAuthUserData: (id: number|null, email: string|null, login: string|null) => void
}
type HeaderContainerType = MapStateToProps & MapDispatchToProps

class HeaderContainer extends React.Component <HeaderContainerType> {

    componentDidMount() {
        headersAPI.getHeaders().then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
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
(mapStateToProps, {setAuthUserData})(HeaderContainer)