import React from "react";
import s from './Profile.module.css';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./Myposts/MyPostsContainer";
import {UserProfile} from "../../redux/profile-reducer";
type ProfileType ={
    profile: UserProfile| null
    status: string
    updateStatusProfile: (status: string) => void
}
export function Profile(props: ProfileType) {

    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatusProfile={props.updateStatusProfile} />
            <MyPostsContainer />
        </div>
    )
}