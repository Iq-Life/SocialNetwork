import React from "react";
import ProfileInfoStyle from "./ProfileDataForm.module.css";
import {UserProfile} from "../../../redux/profile-reducer";
import {CreateField, Input, Textarea} from "../../common/formControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import containerStyle from "../../../Container.module.css"


const ProfileDataForm: React.FC<InjectedFormProps<UserProfile, ProfileDataFormType> & ProfileDataFormType> =
    ({profile, handleSubmit, error}) => {
        return <form onSubmit={handleSubmit} className={ProfileInfoStyle.blockInfo}>
            <div><b>Name</b>:
                {CreateField("Full Name", "fullName",
                    [], Input, null, null)}
            </div>
            <div><b>About me</b>:
                {CreateField("About me", "aboutMe",
                    [], Textarea, null, null)}
            </div>
            <div><b>Looking for a job</b>:
                {CreateField("Looking for a job?", "lookingForAJob",
                    [], Input, {type: "checkbox"}, null)}
            </div>
            <div><b>My professional skills</b>:
                {CreateField("My professional skills", "lookingForAJobDescription",
                    [], Textarea, null, null)}
            </div>
            <div><b>Contacts</b>:
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={containerStyle.contacts}><b>{key}:
                        {CreateField(key, "contacts." + key, [], Input, null, null)}</b></div>
                })}
            </div>
            {error && <div className={containerStyle.formSummaryError}>
                {error}
            </div>}
            <button>save</button>
        </form>
    }

export const ProfileDataReduxForm = reduxForm<UserProfile, ProfileDataFormType>({form: "edit-profile"})(ProfileDataForm)

export default ProfileDataReduxForm
//type
type ProfileDataFormType = {
    profile: UserProfile
}