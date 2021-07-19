import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import { IChannel } from "../models/channels";
import { Channels } from "../api/agent";
import { RootStore } from "./rootStore";

export default class ChannelStore {
  @observable channels: IChannel[] = [];
  @observable isModalVisible: boolean = false;
  @observable activeChannel: IChannel | null = null;
  @observable isChannelLoaded: boolean = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @action changePrivateChannel = async (userId: string) => {
    try {
      let currentChannel = await Channels.privateChannel(userId);
      runInAction(() => {
        this.setActiveChannel(currentChannel);
      });
    } catch (err) {
      throw err;
    }
  };

  @action loadChannels = async () => {
    try {
      this.channels = [];
      var response = await Channels.list();
      runInAction(() => {
        response.forEach((channel) => this.channels.push(channel));
        this.isChannelLoaded = true;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action showModal = (show: boolean) => {
    this.isModalVisible = show;
  };

  @action createChannel = async (channel: IChannel) => {
    try {
      await Channels.create(channel);
      runInAction(() => this.channels.push(channel));
    } catch (error) {
      console.log(error);
    }
  };

  @action setActiveChannel = (channel: IChannel) => {
    this.activeChannel = channel;
  };

  @action getCurrentChannel = () => {
    return toJS(this.activeChannel ?? this.channels[0]);
  };

  @action detail = async (channelId: string): Promise<IChannel> => {
    try {
      return await Channels.detail(channelId);
    } catch (error) {
      throw error;
    }
  };
}
