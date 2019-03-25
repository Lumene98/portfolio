import React, { Component } from 'react';
import './App.css';
import ClickBurst from './ClickBurst'

class App extends Component {
  render() {
    return (
      <div>
        <ClickBurst>
          <button>Do-nothing Button</button>
          <button onClick={() => console.log(`Ahoy!`)}>console.log</button>
        </ClickBurst>

        <ClickBurst>
          <a href="#">Link</a>
        </ClickBurst>
      </div>
    );
  }
}

export default App;
