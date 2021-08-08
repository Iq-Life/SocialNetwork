import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    getUserStatus,
    getUserProfile,
    updateStatusProfile,
    UserProfile,
    savePhoto,
    PhotosType
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router"
import {compose} from "redux";


class ProfileContainer extends React.Component <PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = `${this.props.authorizedUserId}`
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(+userId)
        this.props.getUserStatus(+userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <>
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatusProfile={this.props.updateStatusProfile}
                     savePhoto={this.props.savePhoto}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isFetching
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps, {getUserProfile, getUserStatus, updateStatusProfile, savePhoto}),
    withRouter
)(ProfileContainer)

//types
type MapStateToPropsType = {
    profile: UserProfile | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatusProfile: (status: string) => void
    savePhoto: (photos: File) => void
}
type ProfileContainerAPIType = MapStateToPropsType & MapDispatchToPropsType
type PathParamsType = { userId: string }
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerAPIType
