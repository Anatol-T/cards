import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0' || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAndProfileApi = {
    me() {
        return instance.post<UserResponseType>('/auth/me')
    },
    register(email: string, password: string) {
        return instance.post<RegistrationResponseType>('/auth/register', {email, password})
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<UserResponseType>('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete<LogoutResponseType>('/auth/me')
    },
    sendMail(email: string) {
        return instance.post(`auth/forgot`, {
            email: email,
            from: "test-front-admin <anastasiyamihalenko@gmail.com>",
            message: `<div style="text-align: center; background-color: #F9F9FE; width: 50%; margin: 20px auto; border-radius: 20px; padding: 20px">
            <div style="background-color: #D7D8EF; padding: 15px; display: inline-block; border-radius: 50%">
                <img src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/000000/external-Letter-business-and-marketing-bearicons-detailed-outline-bearicons.png" alt="#"/>
            </div>
            <p style="font-size: 17px; color: #2D2E46">We heard you need a password reset. Click the link below, and you'll be redirected to a site from which you can set a new password.</p>
            <a style="text-decoration: none; color: white; background-color: #21268F; outline: none; border: none; padding: 15px 20px;border-radius: 7px;"
            href='https://nastassiamikhalenka.github.io/projectcards/#/set-new-password/$token$'>Reset password</a>
        </div>`
        })
    },
    newPassword(password: string, resetPasswordToken: string | undefined) {
        return instance.post<any>('/auth/set-new-password', {password, resetPasswordToken})
    },
    updateProfile(data: updateProfileRequestType) {
        return instance.put<updateProfileRequestType, AxiosResponse<updateProfileResponseType, updateProfileRequestType>, updateProfileRequestType>(`auth/me`, data)
    },
}

export type UserResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    token?: string
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export type LogoutResponseType = {
    info: string
    error: string
}

type RegistrationResponseType = {
    addedUser: any,
    error?: string
}

export type updateProfileRequestType = {
    name?: string
    avatar?: string
}
export type updateProfileResponseType = {
    updatedUser: UserResponseType
    error?: string
}
