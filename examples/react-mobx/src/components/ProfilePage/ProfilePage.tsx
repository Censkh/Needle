import * as React from "react";
import {inject} from "needle-inject";
import AuthService from "../../lib/AuthService";
import {observer} from "mobx-react";

@observer
export default class ProfilePage extends React.Component {

    @inject
    private authService : AuthService;

    render() {
        return <h1>{this.authService.store.userName}'s Profile Page</h1>
    }

}