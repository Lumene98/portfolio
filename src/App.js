// @flow
import React, { Component } from "react";
import mojs from "mo-js";
import Links from "./components/Links";
import Toggle from "./components/Toggle";
import Footer from "./components/Footer";
import styled, { ThemeProvider } from "styled-components/macro";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";

const AppWrapper: React$ComponentType<{}> = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  font-family: Fredoka One, sans-serif;
`;

type Props = {};

type State = {|
  numBurstsToGenerate: number,
  bursts: Array<any>,
  theme: "light" | "dark",
|};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const localTheme = window.localStorage.getItem("theme");

    this.state = {
      numBurstsToGenerate: 5,
      bursts: [],
      theme: localTheme ? localTheme : "dark",
    };
  }

  rand = ({
    min = 0,
    max = 1,
    int = true,
  }: {
    min?: number,
    max?: number,
    int?: boolean,
  }) => {
    if (int) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    return Math.random() * (max - min) + min;
  };

  generateBursts = () => {
    this.setState({
      bursts: [],
    });

    while (this.state.bursts.length < this.state.numBurstsToGenerate) {
      this.state.bursts.push(
        new mojs.Burst({
          left: 0,
          top: 0,
          radius: this.rand({ min: 4, max: 19 }),
          angle: this.rand({ min: 0, max: 359 }),
          children: {
            shape: `line`,
            radius: this.rand({ min: 2, max: 12 }),
            scale: this.rand({ min: 0.5, max: 1.1, int: false }),
            stroke: `${
              this.state.theme === "light"
                ? lightTheme.effectColor
                : darkTheme.effectColor
            }`,
            strokeDasharray: `100%`,
            strokeDashoffset: { "-100%": `100%` },
            duration: this.rand({ min: 400, max: 600 }),
            easing: `quad.out`,
          },
          onStart() {
            this.el.style.zIndex = `9999`;
          },
          onComplete() {
            this.el.style.zIndex = `-666`; // curse ye to hell foul demon!
          },
        })
      );
    }
  };

  kaboom = (e: MouseEvent) => {
    e.stopPropagation();

    if (this.state.bursts.length !== this.state.numBurstsToGenerate) {
      this.generateBursts();
    }

    this.state.bursts[this.rand({ max: this.state.bursts.length })]
      .tune({ x: e.pageX, y: e.pageY })
      .replay();
  };

  toggleTheme = () => {
    const { theme } = this.state;
    const newTheme = theme === "light" ? "dark" : "light";
    this.setState({ theme: newTheme });
    window.localStorage.setItem("theme", newTheme);
  };

  render() {
    const { theme } = this.state;
    return (
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <AppWrapper onClick={e => this.kaboom(e)}>
            <Footer theme={theme}>
              <Toggle theme={theme} toggleTheme={this.toggleTheme}></Toggle>
            </Footer>
            <h1>{`Hello, my name is Luca, I'm ${new Date().getFullYear() -
              1998}...`}</h1>
            <Links theme={theme} />
          </AppWrapper>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
