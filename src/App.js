import React, { Component } from 'react';
import mojs from 'mo-js';
import './App.css';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.moon = React.createRef();

    this.timeline = new mojs.Timeline({
      duration: 6000
    })
    this.timeline.add(new mojs.Shape({
      shape: 'rect',
      fill: 'none',
      radius: 60,
      top: '30%',
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
      radius: 40,
      top: '30%',
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
      radius: 20,
      top: '30%',
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
      repeat: 0
    }).then({
      scale: { 4: 0 },
      radius: 25,
      angle: { 0: 180 },
      duration: 2000,
      repeat: 0
    }));

    this.timeline.append(new mojs.Burst({
      radius: { 25: 75 },
      count: 10,
      top: '30%',
      duration: 2000,
      children: {
        shape: ['circle', 'polygon'],
        fill: ['#333', 'magenta', 'purple'],
        angle: { 0: 180 },
        degreeShift: 'rand(-360, 360)',
        delay: 'stagger(0, 25)',
      }
    }));
    this.timeline.play();


  }


  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <h1>Hello, I'm Luca...</h1>
        <Toolbar />
        <Footer />
      </div>
    );
  }
}

export default App;
