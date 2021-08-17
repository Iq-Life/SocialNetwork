import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "d9baecdc-1ca4-440c-8d10-aee3256853c8"
    }
})

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}

//types & enum
export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultForCaptcha {
    CaptchaIsRequired = 10
}
