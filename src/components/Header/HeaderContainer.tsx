import React from "react";
import Header from "./Header";
import {AppStateType} from "../../redux/redux-store";
import axios from "axios";
import {connect} from "react-redux";
import {setUserData} from "../../redux/auth-reducer";

type HeaderContainerType ={

}
type mapStateToPropsType ={

}
type MapDispatchToPropsType ={

}

class HeaderContainer extends React.Component <HeaderContainerType> {

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                   this.props.se
                }
            })
    }

    render() {
        return <Header />
    }
}
const mapStateToProps = (state:mapStateToPropsType) => {
    return{

    }
}

export default connect<mapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps,{setUserData} ) (HeaderContainer)