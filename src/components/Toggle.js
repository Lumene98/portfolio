// @flow
import React from "react";
import styled from "styled-components/macro";
import { lightTheme, darkTheme } from "../theme";

const ToggleWrapper: React$ComponentType<{}> = styled.div`
  -webkit-tap-highlight-color: transparent;
  position: relative;
  width: 115px;
  height: 49px;
  margin: 10px;
  border-radius: 40px;
  box-shadow: ${({ theme }) =>
    theme === "dark" ? "" : "0px 5px 35px #d7d7d7"};
`;

const CheckBox: React$ComponentType<{}> = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: 0px;
  cursor: pointer;
  opacity: 0;
  z-index: 2;

  &:checked + span {
    background-color: ${darkTheme.foregroundColor2};
  }

  &:active + span {
    opacity: 0.5;
  }

  &:checked + span:before {
    background-color: ${darkTheme.foregroundColor2};
    transform: translate(56px, -19px);
  }

  &:checked + span:after {
    background-color: ${lightTheme.foregroundColor2};
    transform: translate(70px, 0px);
  }
`;

const Span: React$ComponentType<{}> = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  overflow: hidden;
  opacity: 1;
  background-color: ${lightTheme.foregroundColor2};
  border-radius: 40px;
  transition: 0.2s ease background-color, 0.2s ease opacity;
  display: flex;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 7px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    transition: 0.5s ease transform, 0.2s ease background-color;
  }

  &:before {
    background-color: ${lightTheme.foregroundColor2};
    transform: translate(-58px, 0px);
    z-index: 1;
  }

  &:after {
    background-color: ${darkTheme.foregroundColor2};
    transform: translate(8px, 0px);
    z-index: 0;
  }
`;

type Props = { theme: string, toggleTheme: () => void };

const Toggle = ({
  theme,
  toggleTheme,
}: Props): React$Element<React$ComponentType<any>> => {
  return (
    <ToggleWrapper theme={theme} onClick={toggleTheme}>
      <CheckBox type="checkbox" defaultChecked={theme === "dark"} />
      <Span></Span>
    </ToggleWrapper>
  );
};

export default Toggle;
