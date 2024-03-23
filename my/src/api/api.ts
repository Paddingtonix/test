import axios from "axios/index";

export const instance = axios.create({
    baseURL: `https://qa-qc-back.freydin.space`,
    headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
});

class Service {

    async login(data: LoginCredentials) {
        return instance.post<TokensResponse>(`/login`, data)
    }

}

export const service = new Service();

type LoginCredentials = {
    email: string,
    password: string
}

type TokensResponse = {
    access_token: string,
    refresh_token: string
}