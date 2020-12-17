// @flow
import React from "react";
import styled from "styled-components/macro";
import { lightTheme, darkTheme } from "../theme";

const Container: React$ComponentType<{}> = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) =>
    theme === "dark"
      ? darkTheme.foregroundColor1
      : lightTheme.foregroundColor1};
  box-shadow: ${({ theme }) =>
    theme === "dark" ? "" : `0px 5px 25px ${lightTheme.shadowColor}`};
  border-radius: 25px;
  margin: 10px auto;
`;

type Props = {
  children: React$Node,
  theme: string,
};

export default function Footer({
  children,
  theme,
}: Props): React$Element<React$ComponentType<any>> {
  return <Container theme={theme}>{children}</Container>;
}
