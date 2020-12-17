// @flow
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const mountPoint = document.getElementById("root");

export const applyGlobalStyle = (
  Element: React$ComponentType<any>
): React$Element<React$FragmentType> => (
  <Fragment>
    <Element></Element>
  </Fragment>
);

if (mountPoint) {
  ReactDOM.render(applyGlobalStyle(App), mountPoint);
}

serviceWorker.unregister();
