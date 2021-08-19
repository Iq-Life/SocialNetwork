import {instance, APIResponseType, ResultCodeEnum, ResultForCaptcha} from "./api";

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultForCaptcha>>
        (`auth/login`, {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout() {
        return instance.delete<APIResponseType>(`auth/login`)
    }
}

//type
type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}