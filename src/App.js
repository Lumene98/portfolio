import React, { Component } from 'react';
import mojs from 'mo-js';
import './App.css';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
import Rocket from './components/Rocket';

class App extends Component {

  state = {
    numBurstsToGenerate: 5,
    bursts: [],
    rocket: false,
  }

  handleReload = () => {
    this.setState({ rocket: false })
    this.timeline.stop();
    this.timeline.play();
  }

  rand = ({ min = 0, max = 1, int = true }) => {
    if (int) {
      return Math.floor(Math.random() * (max - min) + min)
    } else {
      return Math.random() * (max - min) + min
    }
  }

  generateBursts = (numBursts = this.state.numBurstsToGenerate) => {
    this.setState({
      bursts: [],
    })

    while (this.state.bursts.length < this.state.numBurstsToGenerate) {
      this.state.bursts.push(
        new mojs.Burst({
          left: 0,
          top: 0,
          radius: { 4: 19 },
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
            strokeDashoffset: { '-100%': `100%` },
            duration: this.rand({ min: 400, max: 600 }),
            easing: `quad.out`,
          },
          onStart() {
            this.el.style.zIndex = `9999`
          },
          onComplete() {
            this.el.style.zIndex = `-666` // curse ye to hell foul demon!
          },
        }),
      )
    }
  }

  componentDidMount() {
    const that = this;
    if (this.state.bursts.length !== this.state.numBurstsToGenerate) {
      this.generateBursts()
    }
    this.timeline = new mojs.Timeline();
    this.timeline.add(new mojs.Shape({
      shape: 'rect',
      fill: 'none',
      radius: 80,
      top: '40%',
      stroke: { 'orange': 'magenta' },
      strokeWidth: { 10: 0 },
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%': '100%' },
      angle: { 0: 180 },
      duration: 3000,
      repeat: 0,
    }));

    this.timeline.add(new mojs.Shape({
      shape: 'circle',
      fill: 'none',
      radius: 60,
      top: '40%',
      stroke: { 'orange': 'magenta' },
      strokeWidth: { 10: 0 },
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%': '100%' },
      angle: { 0: 180 },
      duration: 3000,
      repeat: 0,
    }));

    this.timeline.add(this.lilRect = new mojs.Shape({
      shape: 'rect',
      radius: 30,
      top: '40%',
      fill: { 'orange': 'magenta' },
      angle: { 0: 180 },
      duration: 3000,
      repeat: 0,
    }).then({
      scale: { 1: 0 },
      left: '0%',
      fill: { 'magenta': 'yellow' },
      radius: 25,
      angle: { 0: 180 },
      duration: 2000,
      repeat: 0
    }).then({
      scale: { 0: 1 },
      left: { '95%': '50%' },
      fill: { 'yellow': 'magenta' },
      radius: 25,
      angle: { 0: 180 },
      duration: 2000,
      repeat: 0
    }).then({
      scale: { 1: 4 },
      fill: { 'magenta': 'cyan' },
      radius: 25,
      duration: 2000,
      repeat: 0,
      easing: 'elastic.inout',
    }).then({
      scale: { 4: 0 },
      radius: 25,
      angle: { 0: 180 },
      duration: 2000,
      repeat: 0
    }));

    this.timeline.append(new mojs.Burst({
      radius: { 25: 100 },
      count: 30,
      top: '40%',
      duration: 4000,
      children: {
        shape: ['circle', 'polygon'],
        fill: ['#333', 'magenta', 'purple'],
        angle: { 0: 180 },
        degreeShift: 'rand(-360, 360)',
        delay: 'stagger(0, 25)',
      },
      onComplete(isForward, isYoyo) {
        that.setState({ rocket: true });
      }
    }));
    this.timeline.play();
  }

  kaboom = (e) => {
    e.stopPropagation()

    if (this.state.bursts.length !== this.state.numBurstsToGenerate) {
      this.generateBursts()
    }

    this.state.bursts[this.rand({ max: this.state.bursts.length })]
      .tune({ x: e.pageX, y: e.pageY })
      .replay()


  }


  render() {
    return (
      <div onClick={(e) => this.kaboom(e)} style={{
        height: '100vh', width: "100vw", display: 'flex', flexDirection: 'column', textAlign: 'center', overflow: 'hidden'
      }}>
        <h1>Hello, I'm Luca...</h1>
        <Toolbar reload={this.handleReload} />
        <Rocket visibility={this.state.rocket} />
        <Footer />
      </div>
    );
  }
}

export default App;
