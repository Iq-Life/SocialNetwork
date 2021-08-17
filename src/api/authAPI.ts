import {instance, ResponseType, ResultCodeEnum, ResultForCaptcha} from "./api";

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultForCaptcha>>
        (`auth/login`, {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
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