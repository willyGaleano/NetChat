import { action, makeObservable, observable, reaction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
  rootStore: RootStore;
  @observable token: string | null = window.localStorage.getItem("jwt");
  @observable appLoaded = false;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          //! => para decirle que puede ser nulo
          window.localStorage.setItem("jwt", token!);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };

  @action setToken = (token: string | null) => {
    //window.localStorage.setItem("jwt", token!);
    this.token = token;
  };
}
