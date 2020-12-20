import React from "react";
import s from './Profile.module.css';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionTypes, ProfilePageType} from "../../redux/state";
import MyPostsContainer from "./Myposts/MyPostsContainer";

type PropsType = {
    dispatch: (action:ActionTypes) => void
    profilePage: ProfilePageType
}

export function Profile() {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}