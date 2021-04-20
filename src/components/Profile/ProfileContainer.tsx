import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, UserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router"
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = { profile: null | UserProfile }
type MapDispatchToPropsType = { getUserProfile: (userId: string) => void }
type ProfileContainerAPIType = MapStateToPropsType & MapDispatchToPropsType
type PathParamsType = { userId: string }
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerAPIType

class ProfileContainer extends React.Component <PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "1"
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return <>
            <Profile {...this.props} />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
