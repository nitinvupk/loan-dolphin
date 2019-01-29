import React, { Component } from 'react';
import { colors } from './Colors.js';
import './Colors.css';

class ColorComponent extends Component {
  render() {
    const { update, stage } = this.props;

    return (
      <div className='color-component'>
        <div>
          {colors.map((colorData, index) => {
            if (colorData.name === stage.color) {
              console.log(colorData)
              return (
                <div 
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${colorData.color1}, ${colorData.color2})`
                  }} 
                  className='stage-colors'
                >
                  <p>{update.activity_type}</p>
                </div>
              )
            } else {
              return null
            }
          })}
        </div>
      </div>
    );
  }
}

export default ColorComponent;
