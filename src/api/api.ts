import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "d9baecdc-1ca4-440c-8d10-aee3256853c8"
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userId)
    }

}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get('profile/' + userId).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status: status})
    }
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<LoginResponseType>(`auth/login`, {
            email: email,
            password: password,
            rememberMe: rememberMe
        })
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

//types & enum
export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    resultCode: ResultCodeEnum | ResultForCaptcha
    messages: Array<string>
    data: { userId: number }
}
type LogoutResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
