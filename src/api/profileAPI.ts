import {PhotosType, UserProfile} from "../redux/profile-reducer";
import {instance, ResponseType} from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<UserProfile>('profile/' + userId).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>('profile/status', {status: status})
            .then(response => response.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<ResponseType<PhotosType>>('profile/photo', formData)
            .then(response => response.data)
    },
    saveProfile(profile: UserProfile) {
        return instance.put<ResponseType>('profile', profile).then(response => response.data)
    }
}


