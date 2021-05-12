import { action, makeObservable, observable, configure, runInAction } from "mobx";
import { IChannel } from "../models/channels";
import { Channels} from "../api/agent";
import { RootStore } from "./rootStore";


configure({enforceActions: "always"})
export default class ChannelStore {
    @observable channels: IChannel[] = [];
    @observable isModalVisible: boolean = false;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }

    @action loadChannels = async () => {
        try {
            var response = await Channels.list();
            runInAction(() => response.forEach((channel) => this.channels.push(channel)));
        }catch (error) {
            console.log(error);
        }
    }

    @action showModal = (show: boolean) => {
        this.isModalVisible = show;
    }

    @action createChannel = async (channel: IChannel) => {
        try {
            await Channels.create(channel);
            runInAction(() => this.channels.push(channel));
        } catch (error) {
            console.log(error);
        }
    }
}
