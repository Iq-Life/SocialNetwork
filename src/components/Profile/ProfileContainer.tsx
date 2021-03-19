import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfile, UserProfile} from "../../redux/profile-reducer";

type ProfileContainerAPIType  = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType ={
    profile: null | UserProfile
}
type MapDispatchToPropsType ={
    setUserProfile: (profile: null | UserProfile) => void
}


class ProfileAPIComponent extends React.Component <ProfileContainerAPIType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/3`)
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

 const ProfileContainer = connect < MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {setUserProfile}) (ProfileAPIComponent)
export default ProfileContainer