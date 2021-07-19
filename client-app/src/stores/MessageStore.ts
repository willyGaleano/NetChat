import { action, makeObservable, observable, runInAction } from "mobx";
import {
  IMediaFormValues,
  IMessage,
  IMessageFormValues,
} from "../models/messages";
import { Messages } from "../api/agent";
import { RootStore } from "./rootStore";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

export default class MessageStore {
  @observable messages: IMessage[] = [];
  rootStore: RootStore;
  @observable isModalVisible: boolean = false;
  @observable.ref hubConnection: HubConnection | null = null;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:2982/chat", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on("ReciveMessage", (messages: IMessage) => {
      runInAction(() => this.messages.push(messages));
    });
  };

  @action stopHubConnection = () => {
    this.hubConnection?.stop();
  };

  @action sendMessage = async (message: IMessageFormValues) => {
    try {
      //sin SignalR
      /*
      const result = await Messages.send(message);
      runInAction(() => {
        this.messages.push(result);
      });
      */

      //Con SignalR
      await this.hubConnection!.invoke("SendMessage", message);
    } catch (error) {
      throw error;
    }
  };

  @action loadMessages = async (channelId: string) => {
    try {
      this.messages = [];
      if (channelId !== undefined) {
        const result = await this.rootStore.channelStore.detail(channelId);
        //console.log(`messages: ${JSON.stringify(result, undefined, 2)}`);
        runInAction(() => {
          console.log(this.messages);
          result.messages?.forEach((message) => this.messages.push(message));
          console.log(this.messages);
        });

        console.log(this.messages);
      }
    } catch (error) {}
  };

  @action showModal = (show: boolean) => {
    this.isModalVisible = show;
  };

  @action uploadImage = async (values: IMediaFormValues) => {
    try {
      await Messages.sendMedia(values);
      /* Sin SignalR
      runInAction(() => {
        this.messages.push(result);
        console.log(result);
      });
      */
    } catch (error) {
      throw error;
    }
  };
}
