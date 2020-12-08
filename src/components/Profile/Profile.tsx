import React from "react";
import s from './Profile.module.css';
import MyPosts from "./Myposts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionTypes, ProfilePageType} from "../../redux/state";

type PropsType = {
    dispatch: (action:ActionTypes) => void
    profilePage: ProfilePageType
}

export function Profile(props:PropsType) {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPosts newPostText={props.profilePage.newPostText}
                     posts={props.profilePage.posts}
                     dispatch={props.dispatch}
            />
        </div>
    )
}