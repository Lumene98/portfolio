// @flow
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components/macro";
import * as serviceWorker from "./serviceWorker";

const mountPoint = document.getElementById("root");

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Fredoka One, regular;
    font-style: normal;
    font-weight: 400;
    
  }
  
  body {
    font-family: Fredoka One, sans-serif;
    background: dodgerblue;
    color: white;
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
`;

export const applyGlobalStyle = (Element: React$ComponentType<any>) => (
  <Fragment>
    <Element></Element>
    <GlobalStyles />
  </Fragment>
);

if (mountPoint) {
  ReactDOM.render(applyGlobalStyle(App), mountPoint);
}

serviceWorker.unregister();
