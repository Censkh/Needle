import * as React from "react";
import AuthService from "../../lib/AuthService";
import {inject} from "needle-inject";
import LoginForm from "../LoginForm/LoginForm";
import ProfilePage from "../ProfilePage/ProfilePage";
import {observer} from "mobx-react";

@observer
export default class App extends React.Component {

    @inject
    private authService: AuthService;

    render() {
        return this.authService.store.isLoggedIn ? <ProfilePage/> : <LoginForm/>
    }

}