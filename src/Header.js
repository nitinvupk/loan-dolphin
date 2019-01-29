import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <a className="active" href="#home">Updates</a>
      </div>
    );
  }
}

export default Header;