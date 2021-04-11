import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile, UserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router"
import {Redirect} from "react-router-dom";

type MapStateToPropsType = { profile: null | UserProfile, isAuth: boolean }
type MapDispatchToPropsType = { getUserProfile: (userId: string) => void }
type ProfileContainerAPIType = MapStateToPropsType & MapDispatchToPropsType
type PathParamsType = { userId: string }
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerAPIType

class ProfileAPIComponent extends React.Component <PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "1"
        }
        this.props.getUserProfile(userId)
    }

    render() {
        if(!this.props.isAuth) return <Redirect to={'login'}/>
        return <>
            <Profile {...this.props}/>
        </>
    }

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth:state.auth.isFetching
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileAPIComponent)

const ProfileContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)
export default ProfileContainer
