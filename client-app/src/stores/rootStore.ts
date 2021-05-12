import { createContext } from "react";
import ChannelStore from "./ChannelStore";
import UserStore from "./UserStore";
export class RootStore {
    channelStore: ChannelStore;
    userStore: UserStore;

    constructor() {
        this.channelStore = new ChannelStore(this);
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());