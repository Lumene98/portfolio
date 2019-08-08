// @flow
import React, { Component } from "react";
import mojs from "mo-js";
import Toolbar from "./components/Toolbar";
import styled from "styled-components/macro";

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
`;

type Props = {};

type State = {|
  numBurstsToGenerate: number,
  bursts: Array<any>,
|};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      numBurstsToGenerate: 5,
      bursts: [],
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
            stroke: `rgb(
            ${this.rand({ min: 175, max: 255 })},
            ${this.rand({ min: 175, max: 255 })},
            ${this.rand({ min: 175, max: 255 })}
          )`,
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

  render() {
    return (
      <AppWrapper onClick={e => this.kaboom(e)}>
        <h1>{"Hello, I'm Luca..."}</h1>
        <Toolbar />
      </AppWrapper>
    );
  }
}

export default App;
