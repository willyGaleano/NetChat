import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { User } from "../api/agent";
import { IUser, IUserFormValues } from "../models/users";
import { RootStore } from "./rootStore";
import { history } from "../index";

export default class UserStore {
  @observable user: IUser | null = null;
  rootStore: RootStore;
  @observable users: IUser[] = [];

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @computed get IsLoggedIn() {
    console.log(!!this.user);
    return !!this.user;
  }

  @action loadUsers = async () => {
    try {
      this.users = [];
      const response = await User.list();
      runInAction(() => {
        response.forEach((user) => this.users.push(user));
      });
    } catch (error) {
      throw error;
    }
  };

  @action login = async (values: IUserFormValues) => {
    console.log(history);
    try {
      const user = await User.login(values);
      console.log(user);
      runInAction(() => {
        this.user = user;
        console.log(this.user);
        history.push("/");
        this.rootStore.commonStore.setToken(user.token);
      });
    } catch (error) {
      throw error;
    }
  };

  @action logout = async (id: string) => {
    try {
      await User.logout(id);

      runInAction(() => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push("/login");
      });
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      throw error;
    }
  };
}
