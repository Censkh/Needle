import AuthStore from "./AuthStore";
import {runInAction} from "mobx";

export default class AuthService {

    store: AuthStore;

    constructor() {
        this.store = new AuthStore();
    }

    async logIn(username, password): Promise<any> {
        return new Promise(resolve => {
            window.setTimeout(() => {
                runInAction(() => {
                    this.store.userName = username;
                    this.store.userToken = "USER_TOKEN";
                });

                resolve();
            }, 1000);
        })

    }

}