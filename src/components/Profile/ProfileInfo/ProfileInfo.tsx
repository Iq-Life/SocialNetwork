import React from "react";
import NO from './../../../assets/img/no.png';
import YES from './../../../assets/img/yes.png';
import {PhotosType, UserProfile} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";
import avatar from './../../../assets/img/ava.png';
import s from "./ProfileInfo.module.css"

export function ProfileInfo(props: ProfileInfoType) {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div><h4>Name: </h4><p>{props.profile && props.profile.fullName}</p></div>
            <div>
                <img className={s.avaProfile} src={props.profile.photos.large || avatar} alt={"user avatar"}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>
            <div>Status:
                <ProfileStatusWithHooks status={props.status} updateStatusProfile={props.updateStatusProfile}/>
            </div>
            <div>About me: {props.profile && props.profile.aboutMe}</div>
            <div>Looking for a job: {props.profile && props.profile.lookingForAJob ?
                <img src={YES} alt={"Yes"} width={30} height={30}/>
                : <img src={NO} alt={"No"} width={30} height={30}/>}
            </div>
            <div>Looking for a job description: {props.profile && props.profile.lookingForAJobDescription}</div>
        </div>
    )
}

//type
type ProfileInfoType = {
    profile: UserProfile | null
    status: string
    isOwner: boolean
    savePhoto: (photos: PhotosType) => void
    updateStatusProfile: (status: string) => void
}
