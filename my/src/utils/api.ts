import axios, {AxiosError, AxiosResponse} from "axios";
import {QueryClient, useMutation} from "@tanstack/react-query";
import {useAuth} from "./AuthProvider";
import {getAccessToken, getRefreshToken} from "./local-storage";
import {service} from "./service";

export const instance = axios.create({
    baseURL: `https://qa-qc-back.freydin.space`,
    headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
});

export function setAuthHeaderToInstance(accessToken: string): void {
    instance.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export const useInstanceInterceptors = () => {

    const { signOut } = useAuth();

    const {mutate: refreshToken } = useMutation({
        mutationFn: () => service.refreshToken(getRefreshToken()),
        onError: () => {
            signOut();
        }
    })

    const onResponse = (response: AxiosResponse): AxiosResponse => {
        return response;
    }

    const onResponseError = (error: AxiosError): Promise<AxiosError> => {
        onUnauthorizedError(error);
        return Promise.reject(error);
    }

    const onUnauthorizedError = (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (getAccessToken() && getRefreshToken()) refreshToken()
            else signOut();
        }
    }

    instance.interceptors.response.use(onResponse, onResponseError);
}

