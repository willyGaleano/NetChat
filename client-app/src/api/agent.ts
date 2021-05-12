import axios, { AxiosResponse } from "axios";
import { IChannel } from "../models/channels";
import { history } from "../index";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/users";


axios.defaults.baseURL = "http://localhost:2982/api";

const responseBody = (response: AxiosResponse) => response.data;
axios.interceptors.response.use(undefined, (error) => {
    if (error.message === "Network Error" && !error.response) {
        toast.error("Network Error - Make sure API is runnig")
        return;
    }

    const {status} = error.response;

    if (status === 404) history.push("/notfound");
    if (status === 500) toast.error("Server error");
})

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Channels = {
    list: () : Promise<IChannel[]> => request.get("/channels"),
    create: (channel: IChannel) => request.post("/channels", channel)
}

const User = {
    login: (user: IUserFormValues): Promise<IUser> => request.post("/usuer/login", user),
    register: (user: IUserFormValues): Promise<IUser> => request.post("/usuer/register", user),
    current: (): Promise<IUser> => request.get("/usuer"),
}

export
    {
        Channels,
        User
    };
