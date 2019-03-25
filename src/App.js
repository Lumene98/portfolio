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
        <div className='footer'>Icons made by <a href="https://www.freepik.com/" title="Freepik" target="_blank" rel='noopener noreferrer' >Freepik</a> from <a
          href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel='noopener noreferrer' >www.flaticon.com</a> is licensed by <a
            href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel='noopener noreferrer'>CC 3.0 BY</a>
        </div>
      </div>
    );
  }
}

export default App;
