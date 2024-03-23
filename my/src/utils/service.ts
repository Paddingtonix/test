import {instance} from "./api";

class Service {

    async login(data: LoginCredentials) {
        return instance.post<TokensResponse>(`/login`, data)
    }

    async refreshToken(refreshToken: string | null) {
        return instance.post<TokensResponse>(`/token/refresh`, {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
    }

}

export const service = new Service();

export const queryKeys = {
    refreshToken: () => ["REFRESH_TOKEN"],
}

export type LoginCredentials = {
    email: string,
    password: string
}

export type TokensResponse = {
    access_token: string,
    refresh_token: string
}