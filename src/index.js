import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

window.addEventListener( 'beforeinstallprompt', ( e ) => {
  console.log( 'beforeinstallprompt event has fired' )
  e.prompt ()
});