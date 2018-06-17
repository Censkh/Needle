import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./components/App/App";

window.onload = () => {
    ReactDOM.render(<App/>, document.querySelector("#root"));
}
