import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfile, UserProfile} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router"

type MapStateToPropsType = {
    profile: null | UserProfile
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: null | UserProfile) => void
}
type ProfileContainerAPIType = MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerAPIType

class ProfileAPIComponent extends React.Component <PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2"
        }

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <>
            <Profile {...this.props} profile={this.props.profile}/>
        </>
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileAPIComponent)

const ProfileContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)
export default ProfileContainer
