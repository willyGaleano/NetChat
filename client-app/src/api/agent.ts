import axios, { AxiosResponse } from "axios";
import { IChannel } from "../models/channels";
import { history } from "../index";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/users";
import {
  IMediaFormValues,
  IMessage,
  IMessageFormValues,
} from "../models/messages";

axios.defaults.baseURL = "http://localhost:2982/api";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network Error - Make sure API is runnig");
    return;
  }

  const { status } = error.response;

  if (status === 404) history.push("/notfound");
  if (status === 500) toast.error("Server error");

  throw error.response;
});

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postMedia: (url: string, media: IMediaFormValues) => {
    let formData = new FormData();
    formData.append("File", media.file);
    formData.append("ChannelId", media.channelId);
    formData.append("MessageType", "2");

    return axios
      .post(url, formData, {
        headers: { "Conten-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Channels = {
  list: (): Promise<IChannel[]> => request.get("/channels"),
  create: (channel: IChannel) => request.post("/channels", channel),
  detail: (channelId: string): Promise<IChannel> =>
    request.get(`/channels/${channelId}`),
  privateChannel: (channelId: string): Promise<IChannel> =>
    request.get(`/channels/private/${channelId}`),
};

const User = {
  login: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/login", user),
  register: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/register", user),
  list: (): Promise<IUser[]> => request.get("/user/list"),
  current: (): Promise<IUser> => request.get("/user"),
  logout: (userId: string): Promise<IUser> =>
    request.get(`/user/logout/${userId}`),
};

const Messages = {
  send: (message: IMessageFormValues): Promise<IMessage> =>
    request.post("/message", message),
  sendMedia: (media: IMediaFormValues): Promise<IMessage> =>
    request.postMedia(`/message/upload`, media),
};

export { Channels, User, Messages };
