import {AxiosResponse} from 'axios';
import {instance} from 'common/api/common-api';
import {ResponseType} from 'common/types/common-types';

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data);
    },
    me() {
        return instance.get<ResponseType<UserType>>('auth/me');
    },
    logout() {
        return instance.delete<ResponseType>('auth/login');
    }
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
    captcha?: string
}
type UserType = {
    id: number,
    email: string,
    login: string
}