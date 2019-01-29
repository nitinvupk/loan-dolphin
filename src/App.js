import React, { Component } from 'react';
import Header from './Header';
import { Stages } from './Stages.js';
import StageComponent from './StageComponent';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <div>
          {Stages.map((stage, index) => {
            return (
              <div className='stages' key={index}>
                <StageComponent stage={stage} />
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
