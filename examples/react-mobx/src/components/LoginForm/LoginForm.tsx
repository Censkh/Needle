import * as React from "react";
import {inject} from "needle-inject";
import AuthService from "../../lib/AuthService";
import {observer} from "mobx-react";

export interface LoginFormProps {

}

export interface LoginFormState {
    username: string;
    password: string;
    loggingIn: boolean;
}

@observer
export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    @inject
    private authService: AuthService;

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loggingIn: false,
        }
    }

    private logIn() {
        this.setState({loggingIn: true}, async () => {
            let {username, password} = this.state;
            await this.authService.logIn(username, password);
            this.setState({loggingIn: false})
        })
    }

    private change(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <fieldset disabled={this.state.loggingIn}>
            <p>
                <label>Username</label>
                <input name={"username"} value={this.state.username} onChange={this.change.bind(this)}/>
            </p>
            <p>
                <label>Password</label>
                <input name={"password"} type={"password"} value={this.state.password} onChange={this.change.bind(this)}/>
            </p>

            <button onClick={() => this.logIn()}>Login</button>
        </fieldset>
    }

}