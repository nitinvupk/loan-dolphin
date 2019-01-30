import React, { Component } from 'react';
import Updates from './Updates.json';
import { Stages } from './Stages.js';
import ColorComponent from './ColorComponent';
import './Stages.css';

class StageComponent extends Component {

  checkUpdates = (update, filteredData, value) => {
    const selectedData = filteredData.filter(u => (u.activity_type.includes(value)))
    if (selectedData && selectedData.length) {
      const data = selectedData.filter(u => (u.activity_date > update.activity_date))
      return data.length;
    }
  }

  checkValidUpdates = (update, filteredData, value) => {
    const selectedData = filteredData.filter(u => (u.activity_type.includes(value)))
    if (selectedData && selectedData.length) {
      const data = selectedData.filter(u => (u.activity_date < update.activity_date))
      return data.length;
    }
  }

  sortUpdates = () => {
    const offerUpdates = Updates.activities;
    const filteredData = {};
    Stages.map(stage => {
      let stageName = stage.name;
      if (stageName === 'accepted') {
        filteredData[stageName]= offerUpdates.filter(update => {
          return update.activity_type === 'accept'
        })
      } else if (stageName === 'contact') {
        filteredData[stageName]= offerUpdates.filter(update => {
          return (
            update.activity_type === 'contact' || 
            (this.checkUpdates(update, offerUpdates, 'contact') &&
              this.checkValidUpdates(update, offerUpdates, 'accept'))
          )
        }, this)
      } else if (stageName === 'application') {
        filteredData[stageName]= offerUpdates.filter(update => {
          return (
            update.activity_type === 'application' ||
            (this.checkUpdates(update, offerUpdates, 'application') &&
             this.checkValidUpdates(update, offerUpdates, 'contact'))
          )
        }, this)
      } else if (stageName === 'pending') {
        filteredData[stageName]= offerUpdates.filter(update => {
          return (
            this.checkUpdates(update, offerUpdates, 'settled') ||
            (this.checkUpdates(update, offerUpdates, 'closed') &&
            this.checkValidUpdates(update, offerUpdates, 'application'))
          )
        }, this)
      } else if (stageName === 'settled') {
        filteredData[stageName]= offerUpdates.filter(update => {
          return (
            update.activity_type === 'settled_won' ||
            update.activity_type === 'settled_lost'
          )
        })
      }  else if (stageName === 'closed') {
        filteredData[stageName]= offerUpdates.filter(update => {
          return (
            update.activity_type === 'closed_won' ||
            update.activity_type === 'closed_lost'
          )
        })
      } else {
        return 
      }
    })

    return filteredData
  }

  render() {
    const { stage } = this.props;
    const sortedUpdates = this.sortUpdates();

    return (
      <div className='stage-component'>
        {sortedUpdates[stage.name] && sortedUpdates[stage.name].map((update, index) => {
          return (
            <div>
              <div className='stage-box' key={index}>
                <ColorComponent stage={stage} update={update} />
                <div className='stage-details'>
                  <p>{update.description}</p>
                  <p>{update.activity_date}</p>
                </div>
              </div>
            </div>
          )
        })}
        {sortedUpdates[stage.name].length &&
          <div className='text-center main-stage'>
            <p className='stage-text'>{stage.name}</p>
            <hr />
          </div>
        }
      </div>
    );
  }
}

export default StageComponent;
