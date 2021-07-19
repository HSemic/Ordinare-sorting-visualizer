import ReactDOM from "react-dom";

import App from "./App";

import { Provider } from "react-redux";
import store from "./app/store";

import "./styles/css/App.css";

import "@fontsource/lato";
import "@fontsource/pacifico";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
