import React from "react";
import s from './ProfileInfo.module.css';
import NO from './../../../assets/img/no.png';
import YES from './../../../assets/img/yes.png';
import {UserProfile} from "../../../redux/profile-reducer";
import {ProfileStatus} from "../ProfileStatus";
import {Preloader} from "../../common/Preloader";
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";

type ProfileInfoType ={
    profile:  UserProfile| null
    status: string
    updateStatusProfile: (status: string) => void
}

export function ProfileInfo(props:ProfileInfoType) {
     if (!props.profile) {
      return <Preloader/>
    }

    return (
    <div>
        <div><h4>Name: </h4><p>{props.profile && props.profile.fullName}</p></div>
        <img src={props.profile ?  props.profile.photos.large : ''}  alt={"user avatar"}/>
        <div>Status:
        <ProfileStatusWithHooks status={props.status} updateStatusProfile={props.updateStatusProfile}/>
        </div>
        <div>About me: {props.profile &&  props.profile.aboutMe}</div>
        <div>Looking for a job: {props.profile &&  props.profile.lookingForAJob?
            <img src={YES} alt={"Yes"} width={30} height={30}/> : <img src={NO} alt={"No"} width={30} height={30}/> }
        </div>
        <div>Looking for a job description: {props.profile &&  props.profile.lookingForAJobDescription}</div>
    </div>
    )}