import React from "react";
import s from './ProfileInfo.module.css';
import lo from './../../../assets/img/samurai.jpg';
import NO from './../../../assets/img/no.png';
import YES from './../../../assets/img/yes.png';

import {Preloader} from "../../common/Preloader";
import {UserProfile} from "../../../redux/profile-reducer";

type ProfileInfoType ={
    profile:  null | UserProfile
}

export function ProfileInfo(props:ProfileInfoType) {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
    <div>
        <div className={s.head}><img  src={lo} alt="I"/></div>
        <div><h4>Name: </h4><p>{props.profile.fullName}</p></div>
        <img src={props.profile.photos.large}  alt={"user avatar"}/>
        <div>About me: {props.profile.aboutMe}</div>
        <div>Looking for a job: {props.profile.lookingForAJob?
            <img src={YES} alt={"Yes"} width={30} height={30}/> : <img src={NO} alt={"No"} width={30} height={30}/> }
        </div>
        <div>Looking for a job description: {props.profile.lookingForAJobDescription}</div>
        <div className={s.description}>ava + description</div>
    </div>
    )}