import React, { Component } from 'react'
import ClickBurst from './ClickBurst';

export class Toolbar extends Component {
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
        )
    }
}

export default Toolbar
