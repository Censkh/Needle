import {computed, observable} from "mobx";

export default class AuthStore {

    @observable userToken : string | null = null;
    @observable userName: string | null = null;

    @computed get isLoggedIn() {
        return this.userToken != null;
    }

}