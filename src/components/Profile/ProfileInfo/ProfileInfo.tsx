import React, {ChangeEvent, useState} from "react";
import NO from './../../../assets/img/no.png';
import YES from './../../../assets/img/yes.png';
import {ContactsUserProfile, UserProfile} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";
import avatar from './../../../assets/img/ava.png';
import s from "./ProfileInfo.module.css"
import ProfileDataForm from "./ProfileDataForm";

export const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                           profile, status, isOwner,
                                                           savePhoto, updateStatusProfile, saveProfile
                                                       }) => {

    let [editMode, setEditMode] = useState(false)

    if
    (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: UserProfile) => {
        saveProfile(formData)
        setEditMode(false)
    }
    return (
        <div className={s.blockProfile}>
            <div>{editMode ?
                <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                <ProfileData profile={profile} goToEditMode={() => setEditMode(true)}/>}
            </div>
            <div className={s.blockPhoto}>
                <div><b>Status</b>:<ProfileStatusWithHooks status={status} updateStatusProfile={updateStatusProfile}/>
                </div>
                <div>
                    <img className={s.avaProfile} src={profile.photos.large || avatar} alt={"user avatar"}/>
                    <div>{isOwner && <input className={s.input} type={"file"} onChange={onMainPhotoSelected}/>}</div>
                </div>
            </div>
        </div>
    )
}

const ProfileData: React.FC<ProfileDataType> = ({profile, goToEditMode}) => {
    return <div className={s.blockInfo}>
        <div><b>Name</b>: <div>{profile && profile.fullName}</div>
        </div>
        <div><b>About me</b>: {profile && profile.aboutMe}</div>
        <div><b>Looking for a job</b>: {profile && profile.lookingForAJob
            ? <img src={YES} alt={"Yes"} width={30} height={30}/>
            : <img src={NO} alt={"No"} width={30} height={30}/>}
        </div>
        <div><b>My professional skills</b>: {profile && profile.lookingForAJobDescription}</div>
        <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key}
                             contactValue={profile.contacts[key as | keyof ContactsUserProfile]}/>
        })}
        </div>
        <button onClick={() => goToEditMode()}>edit</button>
    </div>
}
export const Contacts = (props: ContactsType) => {
    return <div className={s.contacts}><b>{props.contactTitle}</b>: {props.contactValue}</div>
}
//type
type ProfileInfoType = {
    profile: UserProfile | null
    status: string
    isOwner: boolean
    savePhoto: (photos: File) => void
    saveProfile: (profile: UserProfile) => void
    updateStatusProfile: (status: string) => void
}
type ProfileDataType = {
    profile: UserProfile
    goToEditMode: () => void

}
type ContactsType = {
    contactTitle: string
    contactValue: string
}
